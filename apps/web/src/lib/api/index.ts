import { createApiClient } from '@platform/api-client';
import { env } from '../env';

export const api = createApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL,
});

export * from './errors';

