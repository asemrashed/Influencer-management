import { queryOptions } from '@tanstack/react-query';
import { api, unwrap } from '@/lib/api/index';
import { STALE } from '@/lib/api/stale';

export const campaignKeys = {
  all: ['campaigns'] as const,
  list: (cursor?: string) => [...campaignKeys.all, 'list', cursor ?? null] as const,
  detail: (id: string) => [...campaignKeys.all, 'detail', id] as const,
};

export const campaignListQuery = (cursor?: string) =>
  queryOptions({
    queryKey: campaignKeys.list(cursor),
    queryFn: async () => {
      return unwrap(api.GET('/api/v1/campaigns', { params: { query: { limit: 25, cursor } } }));
    },
    staleTime: STALE.list,
  });

