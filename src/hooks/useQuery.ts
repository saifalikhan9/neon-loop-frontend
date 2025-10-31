// hooks/useQuery.ts
import { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";

interface UseQueryResult<T> {
  data: T | null;
  error: AxiosError | null;
  isLoading: boolean;
  refetch: () => void;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Global cache stored outside component lifecycle
const queryCache = new Map<string, CacheEntry<unknown>>();

interface UseQueryOptions {
  cacheKey?: string;
  cacheTime?: number; // in milliseconds, default: 5 minutes
  staleTime?: number; // in milliseconds, default: 0 (always fresh)
  enabled?: boolean; // whether to automatically execute the query
}

export function useQuery<TData = unknown>(
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions
): UseQueryResult<TData> {
  const {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    enabled = true,
  } = options || {};

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!enabled);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  const fetchData = useRef(async (skipCache = false) => {
    if (!enabled) return;

    try {
      if (!isMountedRef.current) return;

      setIsLoading(true);
      setError(null);

      // Check cache if cacheKey is provided and not skipping cache
      if (cacheKey && !skipCache) {
        const cachedEntry = queryCache.get(cacheKey);

        if (cachedEntry) {
          const age = Date.now() - cachedEntry.timestamp;

          // If data is within staleTime, use it immediately without loading state
          if (age < staleTime) {
            setData(cachedEntry.data as TData);
            setIsLoading(false);
            return;
          }

          // If data is within cacheTime but stale, show cached data while refetching
          if (age < cacheTime) {
            setData(cachedEntry.data as TData);
            setIsLoading(false);
            // Continue to fetch fresh data in background
          }
        }
      }

      const result = await queryFn();

      if (!isMountedRef.current) return;

      setData(result);

      // Store in cache if cacheKey is provided
      if (cacheKey) {
        queryCache.set(cacheKey, {
          data: result as unknown,
          timestamp: Date.now(),
        });
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err as AxiosError);
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }).current;

  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, fetchData]);
  const refetch = useRef(() => {
    fetchData(true); // Skip cache on manual refetch
  }).current;

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}

// Utility function to clear cache
export const clearQueryCache = (cacheKey?: string) => {
  if (cacheKey) {
    queryCache.delete(cacheKey);
  } else {
    queryCache.clear();
  }
};
