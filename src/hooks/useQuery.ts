// hooks/useQuery.ts
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

interface UseQueryResult<T> {
  data: T | null;
  error: AxiosError | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useQuery<T = any>(
  queryFn: () => Promise<T>
): UseQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}