#!/usr/bin/env node
// UI guard: zero-dependency checks for the frontend rules in .claude/skills/web-* (see FRONTEND_PLAN.md).
// Skips cleanly when apps/web and packages/ui do not exist yet. Suppress a single line with `ui-guard-ignore` in a comment.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, basename, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css']);
const ALLOWED_PUBLIC_ENV = new Set(['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_SITE_URL']);
const UI_NON_COMPONENT_DIRS = new Set(['primitives', 'styles', 'lib', 'utils', 'hooks']);

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.next' || name.startsWith('.tsc')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (SRC_EXT.has(extname(p))) out.push(p);
  }
  return out;
}

const posix = (p) => p.split(sep).join('/');
const isTest = (f) => /\.(test|spec)\.[tj]sx?$/.test(f) || f.includes('/__tests__/') || f.includes('/e2e/');

export function checkRepo(root) {
  const webSrc = join(root, 'apps/web/src');
  const uiSrc = join(root, 'packages/ui/src');
  if (!existsSync(webSrc) && !existsSync(uiSrc)) return { skipped: true, violations: [] };

  const violations = [];
  const add = (file, line, rule, msg) => violations.push({ file: posix(relative(root, file)), line, rule, msg });
  const files = [...walk(webSrc), ...walk(uiSrc)];
  const names = new Map(); // component name -> files

  for (const file of files) {
    const rel = posix(relative(root, file));
    const inUi = rel.startsWith('packages/ui/');
    const inFeatureOrApp = rel.startsWith('apps/web/src/features/') || rel.startsWith('apps/web/src/app/');
    const isCss = file.endsWith('.css');
    const isTokens = /(^|\/)(tokens|theme[^/]*)\.css$/.test(rel) || rel.includes('/styles/');
    const test = isTest(rel);
    const lines = readFileSync(file, 'utf8').split('\n');

    lines.forEach((text, i) => {
      if (text.includes('ui-guard-ignore')) return;
      const n = i + 1;
      const code = text.replace(/\/\/.*$/, ''); // ignore trailing line comments
      if (test) return;

      if (inFeatureOrApp && !isCss && /<(button|table|input|select|textarea|dialog)[\s>/]/.test(code)) {
        add(file, n, 'raw-element', 'Use the packages/ui component instead of a raw HTML element.');
      }
      if (!isCss && /(^|[^\w.])fetch\s*\(/.test(code) && !rel.startsWith('apps/web/src/lib/api/')) {
        add(file, n, 'raw-fetch', 'Network calls go through apps/web/src/lib/api only.');
      }
      if (/dangerouslySetInnerHTML|\.innerHTML\s*=/.test(code) && !rel.startsWith('packages/ui/src/safe-html/')) {
        add(file, n, 'unsafe-html', 'HTML injection is allowed only inside packages/ui SafeHtml.');
      }
      if (!isTokens && (/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{8}\b/.test(code) && /['"`:\s(]#[0-9a-fA-F]{3,8}\b/.test(code)
          || /\b(rgb|rgba|hsl|hsla|oklch|oklab)\(/.test(code))) {
        add(file, n, 'hardcoded-color', 'Use semantic tokens; colors live only in the tokens/theme CSS.');
      }
      if (!isTokens && !isCss && /(?:^|[\s"'`:])[\w-]*-\[[^\]\s]*(?:#|px|rem|em|rgb|hsl|oklch|%)[^\]\s]*\]/.test(code)
          && /class(Name)?\s*=|cn\(|cva\(|clsx\(|className/.test(code)) {
        add(file, n, 'arbitrary-value', 'No arbitrary Tailwind values; use tokens/scale.');
      }
      if (/process\.env/.test(code) && !/^apps\/web\/src\/lib\/env(\.server)?\.ts$/.test(rel)) {
        add(file, n, 'process-env', 'Read env only through apps/web/src/lib/env.ts.');
      }
      for (const m of code.matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) {
        if (!ALLOWED_PUBLIC_ENV.has(m[0])) add(file, n, 'public-env', `${m[0]} is not an allowed public env var.`);
      }
      if (/(localStorage|sessionStorage|indexedDB)/.test(code) && /(token|auth|session|csrf|password|jwt|credential|\bsid\b)/i.test(code)) {
        add(file, n, 'auth-in-storage', 'Never keep auth/session data in browser storage.');
      }
      if (/persistQueryClient|createSyncStoragePersister|createAsyncStoragePersister/.test(code)) {
        add(file, n, 'persisted-cache', 'Authenticated query cache must never be persisted.');
      }
      if (inUi && /from\s+['"](@tanstack\/react-query|next\/(navigation|headers|cache|server)|@platform\/web|.*apps\/web.*)['"]/.test(code)) {
        add(file, n, 'ui-boundary', 'packages/ui is presentational: no data fetching, no next data APIs, no app imports.');
      }
      if (rel.startsWith('apps/web/src/features/')) {
        const m = code.match(/from\s+['"](?:@\/|\.\.\/(?:\.\.\/)*)features\/([^/'"]+)\/components/);
        const own = rel.split('/')[4];
        if (m && m[1] !== own) add(file, n, 'feature-boundary', `Feature "${own}" imports components of "${m[1]}"; promote to packages/ui.`);
      }
    });

    if (/\.tsx$/.test(file) && !test) {
      const b = basename(file, '.tsx');
      if (/^[A-Z][A-Za-z0-9]+$/.test(b)) names.set(b, [...(names.get(b) ?? []), rel]);
    }
  }

  for (const [name, where] of names) {
    if (where.length > 1) add(join(root, where[0]), 1, 'duplicate-component', `Component "${name}" defined in ${where.length} places: ${where.join(', ')}`);
  }

  // Every packages/ui component folder must be listed in the registry.
  const registry = join(root, '.claude/skills/component-registry/SKILL.md');
  if (existsSync(uiSrc) && existsSync(registry)) {
    const reg = readFileSync(registry, 'utf8');
    for (const d of readdirSync(uiSrc)) {
      const p = join(uiSrc, d);
      if (!statSync(p).isDirectory() || UI_NON_COMPONENT_DIRS.has(d)) continue;
      if (!new RegExp(`\\b${d}\\b`).test(reg)) add(p, 1, 'unregistered-component', `packages/ui/src/${d} is not listed in component-registry.`);
    }
  }

  // .env files inside apps/web must not expose non-allowed NEXT_PUBLIC_ vars.
  const webDir = join(root, 'apps/web');
  if (existsSync(webDir)) {
    for (const f of readdirSync(webDir).filter((x) => x.startsWith('.env'))) {
      readFileSync(join(webDir, f), 'utf8').split('\n').forEach((text, i) => {
        const m = text.match(/^\s*(NEXT_PUBLIC_[A-Z0-9_]+)/);
        if (m && !ALLOWED_PUBLIC_ENV.has(m[1])) add(join(webDir, f), i + 1, 'public-env', `${m[1]} is not an allowed public env var.`);
        if (/^\s*NEXT_PUBLIC_[A-Z0-9_]*(SECRET|KEY|TOKEN|PASSWORD)/i.test(text)) add(join(webDir, f), i + 1, 'public-secret', 'Secret-like name exposed as NEXT_PUBLIC_.');
      });
    }
  }
  return { skipped: false, violations };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const root = process.argv[2] ?? process.cwd();
  const { skipped, violations } = checkRepo(root);
  if (skipped) { console.log('ui-guard: apps/web and packages/ui not present yet — skipped.'); process.exit(0); }
  for (const v of violations) console.error(`${v.file}:${v.line}  [${v.rule}] ${v.msg}`);
  console.log(`ui-guard: ${violations.length} violation(s).`);
  process.exit(violations.length ? 1 : 0);
}
