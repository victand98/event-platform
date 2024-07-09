import { useRequest } from '@/hooks';
import { APIError } from '@/modules';
import { act, renderHook, waitFor } from '@testing-library/react';
import { generateTestData } from '../../__utils__';

describe('useRequest', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() =>
      useRequest({ request: () => Promise.resolve('response') })
    );

    expect(result.current.error).toBeNull();
    expect(result.current.response).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.doRequest).toBeInstanceOf(Function);
  });

  it('should handle successful request', async () => {
    const mockResponse = { data: 'test' };
    const mockRequest = jest.fn().mockResolvedValue(mockResponse);
    const mockOnSuccess = jest.fn();

    const { result } = renderHook(() =>
      useRequest({ request: mockRequest, onSuccess: mockOnSuccess })
    );

    act(() => {
      result.current.doRequest();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBe(mockResponse);
      expect(result.current.error).toBeNull();
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse);
    });
  });

  it('should handle API error', async () => {
    const mockError = new APIError(generateTestData('apiError'));

    const mockRequest = jest.fn().mockRejectedValue(mockError);
    const mockOnError = jest.fn();

    const { result } = renderHook(() =>
      useRequest({ request: mockRequest, onError: mockOnError })
    );

    act(() => {
      result.current.doRequest();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBeNull();
      expect(result.current.error?.name).toEqual(mockError.name);
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledWith(mockError);
    });
  });

  it('should handle unexpected error', async () => {
    const mockRequest = jest
      .fn()
      .mockRejectedValue(new Error('unexpected error'));
    const mockOnError = jest.fn();

    const { result } = renderHook(() =>
      useRequest({ request: mockRequest, onError: mockOnError })
    );

    act(() => {
      result.current.doRequest();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBeNull();
      expect(result.current.error?.errors[0].message).toEqual(
        'An unexpected error occurred'
      );
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledTimes(1);
      expect(mockOnError).toHaveBeenCalledWith(
        expect.objectContaining({
          errors: [{ message: 'An unexpected error occurred' }],
        })
      );
    });
  });

  it('should handle multiple calls', async () => {
    const mockRequest = jest
      .fn()
      .mockResolvedValueOnce('response1')
      .mockResolvedValueOnce('response2');

    const { result } = renderHook(() => useRequest({ request: mockRequest }));

    act(() => {
      result.current.doRequest();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBe('response1');
      expect(result.current.error).toBeNull();
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.doRequest();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBe('response2');
      expect(result.current.error).toBeNull();
      expect(mockRequest).toHaveBeenCalledTimes(2);
    });
  });

  it('should pass arguments to request function', async () => {
    const mockRequest = jest.fn().mockResolvedValue('response');

    const { result } = renderHook(() => useRequest({ request: mockRequest }));

    act(() => {
      result.current.doRequest('arg1', 'arg2');
    });

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(mockRequest).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });
});
