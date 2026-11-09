import { queryOptions } from '@tanstack/react-query';
import { api, unwrap } from '@/lib/api/index';
import { STALE } from '@/lib/api/stale';

export const inboxKeys = {
  all: ['inbox'] as const,
  threads: (cursor?: string) => [...inboxKeys.all, 'threads', cursor ?? null] as const,
  messages: (threadId: string) => [...inboxKeys.all, 'messages', threadId] as const,
};

export const inboxThreadsQuery = (cursor?: string) =>
  queryOptions({
    queryKey: inboxKeys.threads(cursor),
    queryFn: async () => {
      return unwrap(api.GET('/api/v1/inbox/threads', { params: { query: { limit: 25, cursor } } }));
    },
    staleTime: STALE.list,
  });

export const threadDetailsQuery = (threadId: string) =>
  queryOptions({
    queryKey: inboxKeys.messages(threadId),
    queryFn: async () => {
      return unwrap(api.GET('/api/v1/inbox/threads/{id}', { params: { path: { id: threadId } } }));
    },
    staleTime: STALE.detail,
    enabled: Boolean(threadId),
  });

