import { Router } from 'express';
import { randomBytes } from 'node:crypto';
import { z } from 'zod';
import {
  getFileUrlQuerySchema,
  uploadFileBodySchema,
  uploadFileResponseSchema,
} from '@platform/shared-types';
import { errors } from '../../lib/errors.js';
import { routeFactory, type RouteKit } from '../../lib/route.js';
import { requireProvider } from '../../providers/index.js';
import {
  detectBufferMime,
  getFolderFromKey,
} from './storage.utils.js';

export function storageRoutes(kit: RouteKit): Router {
  const router = Router();
  const route = routeFactory(kit, router);
  const { providers } = kit.c;

  route(
    {
      method: 'post',
      path: '/api/v1/storage/upload',
      operationId: 'uploadFile',
      tags: ['Storage'],
      summary: 'Upload a file (image, asset, document) to configured storage',
      access: { type: 'authenticated' },
      body: uploadFileBodySchema,
      response: { status: 201, schema: uploadFileResponseSchema },
    },
    async ({ body }) => {
      const storage = requireProvider(providers.storage, 'Storage');

      // Decode base64
      const buffer = Buffer.from(body.base64Data, 'base64');

      // Max 10MB file limit
      if (buffer.length > 10 * 1024 * 1024) {
        throw errors.validation([{ path: 'base64Data', message: 'File size exceeds 10MB limit' }]);
      }

      // Sniff file type from content, never trust client-sent MIME type
      const detected = detectBufferMime(buffer);
      if (!detected) {
        throw errors.validation([{ path: 'base64Data', message: 'Unsupported or unidentifiable file content' }]);
      }

      // Generate random file name (never use client's file name as path)
      const randomName = `${Date.now()}-${randomBytes(8).toString('hex')}.${detected.ext}`;
      const key = `${body.folder}/${randomName}`;

      await storage.put(key, buffer);
      const url = await storage.getUrl(key);

      return {
        key,
        url,
        size: buffer.length,
        mimeType: detected.mime,
      };
    },
  );

  route(
    {
      method: 'get',
      path: '/api/v1/storage/url/{key}',
      operationId: 'getFileUrl',
      tags: ['Storage'],
      summary: 'Get signed or download URL for a storage key',
      access: { type: 'authenticated' },
      params: z.object({ key: z.string().min(1) }),
      query: getFileUrlQuerySchema,
      response: { status: 200, schema: z.object({ key: z.string(), url: z.string() }) },
    },
    async ({ params, query }) => {
      const storage = requireProvider(providers.storage, 'Storage');
      const exists = await storage.exists(params.key);
      if (!exists) throw errors.notFound('File');

      const folder = getFolderFromKey(params.key);
      if (!folder) throw errors.notFound('File');

      // For S3 or Cloudinary, getUrl returns signed URL
      const url = await storage.getUrl(params.key, query.expiresInSeconds);
      if (url) {
        return { key: params.key, url };
      }

      // For local storage, returns the direct download endpoint URL
      return { key: params.key, url: `/api/v1/storage/url/${encodeURIComponent(params.key)}/download` };
    },
  );

  return router;
}
