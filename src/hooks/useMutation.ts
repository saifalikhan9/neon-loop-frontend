import { type AxiosResponse } from "axios";
import { useCallback, useState } from "react";

// Define the interface for the hook's return value
interface UseMutationReturn<T, V> {
  /** The data returned from the mutation function after it's called. */
  data: T | null;
  /** True when the mutation is in progress. */
  isLoading: boolean;
  /** Contains the error message if the mutation fails. */
  error: string | null;
  /** The function to trigger the mutation. It takes variables as an argument. */
  mutate: (variables: V) => Promise<void>;
}

/**
 * A custom React hook for performing data mutations (e.g., POST, PUT, DELETE).
 * @param mutationFn A function that takes variables and returns a promise (e.g., an axios call).
 * @returns An object containing the mutation function, data, loading state, and error state.
 */
export default function useMutation<T = any, V = any>(
  mutationFn: (variables: V) => Promise<AxiosResponse<T>>
): UseMutationReturn<T, V> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function will be called to trigger the mutation
  const mutate = useCallback(
    async (variables: V) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await mutationFn(variables);
        setData(response.data);
        return Promise.resolve(); // Resolve promise on success
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An unknown error occurred";
        console.error("Mutation error:", err);
        setError(errorMessage);
        return Promise.reject(err); // Reject promise on error
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn] // Dependency array
  );

  return { data, isLoading, error, mutate };
}
