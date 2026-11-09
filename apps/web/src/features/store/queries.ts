import { queryOptions } from '@tanstack/react-query';
import { api, unwrap } from '@/lib/api/index';
import { STALE } from '@/lib/api/stale';

export const storeKeys = {
  all: ['store'] as const,
  products: (cursor?: string) => [...storeKeys.all, 'products', cursor ?? null] as const,
};

export const storeProductsQuery = (cursor?: string) =>
  queryOptions({
    queryKey: storeKeys.products(cursor),
    queryFn: async () => {
      return unwrap(api.GET('/api/v1/store/products', { params: { query: { limit: 25, cursor } } }));
    },
    staleTime: STALE.list,
  });

