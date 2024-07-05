import { CustomError } from '@/modules';
import React from 'react';

interface useRequestArgs<
  Response,
  Properties extends unknown[],
  Values extends Record<string, any>,
> {
  request: (...args: Properties) => Promise<Response>;
  onSuccess?: (data: Response) => void;
  onError?: (error: CustomError<Values>) => void;
}

const useRequest = <
  Response,
  Properties extends any[],
  Values extends Record<string, any> = Properties[0],
>(
  args: useRequestArgs<Response, Properties, Values>
) => {
  const { request, onSuccess, onError } = args;

  const [error, setError] = React.useState<CustomError<Values> | null>(null);
  const [response, setResponse] = React.useState<Response | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const doRequest = async (...properties: Parameters<typeof request>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await request(...properties);
      setResponse(response);
      onSuccess?.(response);
    } catch (error) {
      let customError: CustomError<Values>;

      if (error instanceof Error) {
        customError = { errors: [{ message: error.message }] };
      } else if ('errors' in (error as Object)) {
        customError = error as CustomError<Values>;
      } else {
        customError = { errors: [{ message: 'An unexpected error occurred' }] };
      }
      setError(customError);
      onError?.(customError);
    } finally {
      setLoading(false);
    }
  };

  return { error, response, loading, doRequest };
};

export { useRequest };
