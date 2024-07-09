import { setFormError, toastError } from '@/lib';
import { APIError } from '@/modules';
import { faker } from '@faker-js/faker';
import { UseFormReturn } from 'react-hook-form';
import { ExternalToast, toast } from 'sonner';
import { generateTestData } from '../../__utils__';

jest.mock('sonner');

describe('error', () => {
  describe('toastError', () => {
    it('should call toast.error for each error in APIError', () => {
      const error = new APIError(
        generateTestData('apiError', {
          errors: [
            { message: faker.word.sample() },
            { message: faker.word.sample() },
          ],
        })
      );

      toastError(error);

      expect(toast.error).toHaveBeenCalledTimes(error.errors.length);
      expect(toast.error).toHaveBeenCalledWith(
        error.errors[0].message,
        undefined
      );
      expect(toast.error).toHaveBeenCalledWith(
        error.errors[1].message,
        undefined
      );
    });

    it('should pass additional data to toast.error', () => {
      const error = new APIError(generateTestData('apiError'));
      const toastData: ExternalToast = { duration: 5000 };

      toastError(error, toastData);

      expect(toast.error).toHaveBeenCalledWith(
        error.errors[0].message,
        toastData
      );
    });

    it('should handle APIError without errors', () => {
      const error = new APIError(generateTestData('apiError', { errors: [] }));

      toastError(error);

      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe('setFormError', () => {
    let mockForm: jest.Mocked<UseFormReturn<any, any, undefined>>;

    beforeEach(() => {
      mockForm = {
        setError: jest.fn(),
      } as unknown as jest.Mocked<UseFormReturn<any, any, undefined>>;
    });

    it('should call form.setError for each error with a field', () => {
      const error = new APIError(
        generateTestData('apiError', {
          errors: [
            { field: 'field', message: faker.word.sample() },
            { field: 'root', message: faker.word.sample() },
          ],
        })
      );

      setFormError(error, mockForm);

      expect(mockForm.setError).toHaveBeenCalledTimes(2);
      expect(mockForm.setError).toHaveBeenNthCalledWith(
        1,
        'field',
        { message: error.errors[0].message },
        { shouldFocus: true }
      );
      expect(mockForm.setError).toHaveBeenNthCalledWith(
        2,
        'root',
        { message: error.errors[1].message },
        { shouldFocus: true }
      );
    });

    it('should not call form.setError for errors without a field', () => {
      const error = new APIError(
        generateTestData('apiError', {
          errors: [
            { message: faker.word.sample() },
            { field: 'field', message: faker.word.sample() },
          ],
        })
      );

      setFormError(error, mockForm);

      expect(mockForm.setError).toHaveBeenCalledTimes(1);
      expect(mockForm.setError).toHaveBeenCalledWith(
        'field',
        { message: error.errors[1].message },
        { shouldFocus: true }
      );
    });

    it('should pass options when provided', () => {
      const error = new APIError(
        generateTestData('apiError', {
          errors: [{ field: 'field', message: faker.word.sample() }],
        })
      );

      setFormError(error, mockForm, { shouldFocus: false });

      expect(mockForm.setError).toHaveBeenCalledWith(
        'field',
        { message: error.errors[0].message },
        { shouldFocus: false }
      );
    });

    it('should handle APIError without errors', () => {
      const error = new APIError(generateTestData('apiError', { errors: [] }));

      setFormError(error, mockForm);

      expect(mockForm.setError).not.toHaveBeenCalled();
    });
  });
});
