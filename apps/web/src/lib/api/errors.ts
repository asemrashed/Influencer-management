export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function unwrap<T>(responsePromise: Promise<{ data?: T; error?: unknown }>): Promise<T> {
  return responsePromise.then(({ data, error }) => {
    if (error) {
      const err = error as {
        code?: string;
        message?: string;
        details?: unknown;
        requestId?: string;
      };
      throw new ApiError(
        err.code ?? 'UNKNOWN_ERROR',
        err.message ?? 'An unknown error occurred',
        err.details,
        err.requestId
      );
    }
    return data as T;
  });
}

