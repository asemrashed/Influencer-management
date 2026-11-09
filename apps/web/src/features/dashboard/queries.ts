import { queryOptions } from '@tanstack/react-query';
import { api, unwrap } from '@/lib/api/index';
import { STALE } from '@/lib/api/stale';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  summary: () => [...dashboardKeys.all, 'summary'] as const,
};

export const dashboardSummaryQuery = () =>
  queryOptions({
    queryKey: dashboardKeys.summary(),
    queryFn: async () => {
      return unwrap(api.GET('/api/v1/dashboard/summary'));
    },
    staleTime: STALE.summary,
  });

