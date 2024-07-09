import { APIError } from '@/modules';
import { Path, UseFormReturn } from 'react-hook-form';
import { ExternalToast, toast } from 'sonner';

const toastError = <T extends Record<string, any>>(
  error: APIError<T>,
  data?: ExternalToast
): void => {
  for (const e of error.errors) {
    toast.error(e.message, data);
  }
};

const setFormError = <T extends Record<string, any>>(
  error: APIError<T>,
  form: UseFormReturn<T, any, undefined>,
  options: { shouldFocus: boolean } = { shouldFocus: true }
): void => {
  for (const e of error.errors) {
    if (e.field) {
      form.setError(e.field as Path<T>, { message: e.message }, options);
    }
  }
};

export { setFormError, toastError };
