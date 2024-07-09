import { APIError } from '@/modules';
import React from 'react';

interface UseRequestArgs<
  Response,
  Properties extends unknown[],
  Values extends Record<string, any>,
> {
  request: (...args: Properties) => Promise<Response>;
  onSuccess?: (data: Response) => void;
  onError?: (error: APIError<Values>) => void;
}

interface UseRequestReturn<
  Response,
  Properties extends unknown[],
  Values extends Record<string, any>,
> {
  error: APIError<Values> | null;
  response: Response | null;
  loading: boolean;
  doRequest: (
    ...properties: Parameters<(...args: Properties) => Promise<Response>>
  ) => Promise<void>;
}

const useRequest = <
  Response,
  Properties extends any[],
  Values extends Record<string, any> = Properties[0],
>(
  args: UseRequestArgs<Response, Properties, Values>
): UseRequestReturn<Response, Properties, Values> => {
  const { request, onSuccess, onError } = args;

  const [error, setError] = React.useState<APIError<Values> | null>(null);
  const [response, setResponse] = React.useState<Response | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const doRequest = async (
    ...properties: Parameters<typeof request>
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await request(...properties);
      setResponse(response);
      onSuccess?.(response);
    } catch (error) {
      if (error instanceof APIError) {
        setError(error);
        onError?.(error);
        return;
      }

      const newError = new APIError<Values>({
        errors: [{ message: 'An unexpected error occurred' }],
      });
      setError(newError);
      onError?.(newError);
    } finally {
      setLoading(false);
    }
  };

  return { error, response, loading, doRequest };
};

export { useRequest };
export type { UseRequestArgs, UseRequestReturn };
