import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { checkRepo } from './ui-guard.mjs';

function repo(files) {
  const root = mkdtempSync(join(tmpdir(), 'uiguard-'));
  for (const [p, c] of Object.entries(files)) { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), c); }
  return root;
}
const rules = (r) => r.violations.map((v) => v.rule).sort();
const REG = { '.claude/skills/component-registry/SKILL.md': '| DataTable | data-table |\n| SafeHtml | safe-html |' };

test('skips when no UI exists', () => {
  const root = repo({ 'README.md': 'x' });
  assert.equal(checkRepo(root).skipped, true);
  rmSync(root, { recursive: true });
});

test('clean code passes', () => {
  const root = repo({ ...REG,
    'apps/web/src/features/orders/components/OrderRow.tsx': "import { Button } from '@platform/ui'; export const OrderRow = () => <Button className=\"bg-primary\">x</Button>;",
    'apps/web/src/lib/env.ts': 'export const e = process.env.NEXT_PUBLIC_API_URL;',
    'apps/web/src/lib/api/client.ts': 'export const f = () => fetch("/x");',
    'packages/ui/src/data-table/DataTable.tsx': 'export const DataTable = () => null;',
    'packages/ui/src/safe-html/SafeHtml.tsx': 'export const SafeHtml = () => <div dangerouslySetInnerHTML={{__html: ""}} />;',
    'packages/ui/src/styles/tokens.css': ':root{--primary:#112233;}' });
  assert.deepEqual(checkRepo(root).violations, []);
  rmSync(root, { recursive: true });
});

test('detects each rule', () => {
  const root = repo({ ...REG,
    'apps/web/src/features/orders/components/Bad.tsx': [
      'export const Bad = () => <button className="w-[13px] text-[#fff]">x</button>;',
      'const a = fetch("/api");',
      'const b = <div dangerouslySetInnerHTML={{__html: x}} />;',
      "const c = '#ff0000';",
      'const d = process.env.SECRET;',
      'localStorage.setItem("auth_token", t);',
      'const e = process.env.NEXT_PUBLIC_STRIPE_KEY;',
      "import { X } from '../../../features/customers/components/X';",
    ].join('\n'),
    'apps/web/src/features/customers/components/StatCard.tsx': 'export const StatCard = () => null;',
    'packages/ui/src/stat-card/StatCard.tsx': "import { useQuery } from '@tanstack/react-query'; export const StatCard = () => null;",
    'packages/ui/src/mystery/Mystery.tsx': 'export const Mystery = () => null;',
    'apps/web/.env.example': 'NEXT_PUBLIC_API_URL=x\nNEXT_PUBLIC_SECRET_KEY=y\n' });
  const got = new Set(rules(checkRepo(root)));
  for (const r of ['raw-element','arbitrary-value','raw-fetch','unsafe-html','hardcoded-color','process-env','public-env','auth-in-storage','duplicate-component','ui-boundary','unregistered-component','public-secret','feature-boundary'])
    assert.ok(got.has(r), `missing rule ${r}; got ${[...got]}`);
  rmSync(root, { recursive: true });
});

test('ui-guard-ignore suppresses a line', () => {
  const root = repo({ ...REG, 'apps/web/src/features/a/components/A.tsx': 'const c = "#ff0000"; // ui-guard-ignore' });
  assert.deepEqual(checkRepo(root).violations, []);
  rmSync(root, { recursive: true });
});
