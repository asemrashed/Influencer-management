import type { Request, Response, NextFunction } from 'express';
import { errors } from '../../lib/errors.js';
import { requireProvider, SAFE_KEY } from '../../providers/index.js';
import type { Container } from '../../container.js';
import {
  detectBufferMime,
  getFolderFromKey,
  PUBLIC_FOLDERS,
  PRIVATE_FOLDERS,
} from './storage.utils.js';

/**
 * Direct file download handler for local storage files.
 * Mounted directly on app so it is not an API route subject to API route policy test.
 * - Files in 'products' and 'portfolio' can be downloaded publicly.
 * - Files in 'drafts', 'media-kit', and 'avatars' require sign-in (session).
 */
export function createStorageDownloadHandler(c: Container) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storage = requireProvider(c.providers.storage, 'Storage');
      const paramVal = (req.params as Record<string, unknown>)['key'];
      const key = Array.isArray(paramVal) ? paramVal.join('/') : typeof paramVal === 'string' ? paramVal : '';
      if (!key || !SAFE_KEY.test(key) || key.includes('..')) {
        throw errors.notFound('File');
      }

      const folder = getFolderFromKey(key);
      if (!folder) {
        throw errors.notFound('File');
      }

      // Check access permission based on folder
      if (PRIVATE_FOLDERS.has(folder)) {
        if (!req.auth?.user) {
          throw errors.unauthenticated();
        }
      } else if (!PUBLIC_FOLDERS.has(folder)) {
        throw errors.notFound('File');
      }

      const exists = await storage.exists(key);
      if (!exists) throw errors.notFound('File');

      const data = await storage.get(key);
      const detected = detectBufferMime(data);
      const contentType = detected?.mime ?? 'application/octet-stream';

      res.setHeader('Cache-Control', PRIVATE_FOLDERS.has(folder) ? 'private, no-cache' : 'public, max-age=86400');
      res.type(contentType);
      res.send(data);
    } catch (err) {
      next(err);
    }
  };
}
