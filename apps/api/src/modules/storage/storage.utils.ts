export interface DetectedType {
  mime: string;
  ext: string;
}

/**
 * Sniffs the buffer's magic bytes to detect file MIME type.
 * Does NOT trust client-supplied MIME type.
 */
export function detectBufferMime(buffer: Buffer): DetectedType | null {
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: 'image/png', ext: 'png' };
  }

  // JPEG: FF D8 FF
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }

  // GIF: GIF87a or GIF89a
  if (
    buffer.length >= 6 &&
    (buffer.toString('ascii', 0, 6) === 'GIF87a' || buffer.toString('ascii', 0, 6) === 'GIF89a')
  ) {
    return { mime: 'image/gif', ext: 'gif' };
  }

  // WebP: RIFF....WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { mime: 'image/webp', ext: 'webp' };
  }

  // PDF: %PDF-
  if (buffer.length >= 4 && buffer.toString('ascii', 0, 4) === '%PDF') {
    return { mime: 'application/pdf', ext: 'pdf' };
  }

  // Plain text / JSON / SVG inspection (safe printable ascii / utf-8)
  let isAscii = true;
  for (let i = 0; i < Math.min(buffer.length, 512); i++) {
    const b = buffer[i]!;
    if (b === 0 || (b < 7 && b !== 9 && b !== 10 && b !== 13)) {
      isAscii = false;
      break;
    }
  }

  if (isAscii && buffer.length > 0) {
    const head = buffer.subarray(0, 100).toString('utf8').trim();
    if (head.startsWith('{') || head.startsWith('[')) {
      return { mime: 'application/json', ext: 'json' };
    }
    if (head.startsWith('<svg') || head.startsWith('<?xml')) {
      return { mime: 'image/svg+xml', ext: 'svg' };
    }
    return { mime: 'text/plain', ext: 'txt' };
  }

  return null;
}

export const ALLOWED_FOLDERS = ['products', 'portfolio', 'media-kit', 'drafts', 'avatars'] as const;
export type StorageFolder = (typeof ALLOWED_FOLDERS)[number];

export const PUBLIC_FOLDERS = new Set<string>(['products', 'portfolio']);
export const PRIVATE_FOLDERS = new Set<string>(['drafts', 'media-kit', 'avatars']);

export function getFolderFromKey(key: string): string | null {
  const parts = key.split('/');
  if (parts.length < 2) return null;
  return parts[0] ?? null;
}
