import { useState, useEffect, useCallback, useRef } from 'react';

// Centrally configured API Base URL
// Falls back to the production backend on Render, or uses environment variable if defined.
export const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'https://eduind-backend.onrender.com';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
  isFallback: boolean; // Flag to indicate if we are showing mock fallback data
}

/**
 * Global fetcher helper.
 * Requests JSON data from the centrally configured backend.
 */
export async function fetchBackendData<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}/api/${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API returned failure state: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

/**
 * Resilient Custom Hook for consuming ASP.NET Core backend endpoints.
 * Includes loading, error, empty state support, and manual retry capability.
 * Fallbacks to high-fidelity mock data if Render's free backend is sleeping.
 */
export function useApi<T>(endpoint: string, fallbackData: T): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  // Track ongoing fetches to prevent race conditions
  const fetchIndex = useRef<number>(0);

  const executeFetch = useCallback(async () => {
    const currentFetchIndex = ++fetchIndex.current;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchBackendData<T>(endpoint);
      
      // Only commit state if this was the latest initiated fetch
      if (currentFetchIndex === fetchIndex.current) {
        setData(result);
        setIsFallback(false);
        setError(null);
      }
    } catch (err: any) {
      console.warn(`[API Connection Note] Endpoint '${endpoint}' failed. Using simulation fallback. Reason:`, err.message || err);
      
      if (currentFetchIndex === fetchIndex.current) {
        // Safe fallback to local high-fidelity mock dataset to guarantee a working dashboard
        setData(fallbackData);
        setIsFallback(true);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (currentFetchIndex === fetchIndex.current) {
        setLoading(false);
      }
    }
  }, [endpoint, fallbackData]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return { data, loading, error, retry, isFallback };
}
