import { SignInForm } from '@/components';
import { useRequest } from '@/hooks';
import userEvent from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  fireEvent,
  generateTestData,
  render,
  screen,
  waitFor,
} from '../../../../__utils__';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks');
jest.mock('sonner');
jest.mock('@/lib');
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('SignInForm', () => {
  const useRequestMock = useRequest as jest.Mock;
  const useRouterMock = useRouter as jest.Mock;
  const doRequestMock = jest.fn();
  const refreshMock = jest.fn();

  beforeEach(() => {
    useRequestMock.mockReturnValue({
      doRequest: doRequestMock,
      loading: false,
    });
    useRouterMock.mockReturnValue({ refresh: refreshMock });
  });

  describe('Rendering', () => {
    it('should render all form fields with correct labels and placeholders', () => {
      render(<SignInForm />);

      expect(screen.getByLabelText('Email')).toHaveAttribute(
        'placeholder',
        'email@example.com'
      );
      expect(screen.getByLabelText('Password')).toHaveAttribute(
        'placeholder',
        '********'
      );
    });

    it('should render the submit button', () => {
      render(<SignInForm />);
      expect(
        screen.getByRole('button', { name: 'Sign In' })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    it('should display error messages for empty fields', async () => {
      render(<SignInForm />);

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getAllByText('Invalid email')).toHaveLength(1);
        expect(
          screen.getAllByText('String must contain at least 8 character(s)')
        ).toHaveLength(1);
      });
    });

    it('should display error message for invalid email', async () => {
      render(<SignInForm />);

      fireEvent.input(screen.getByLabelText('Email'), {
        target: { value: 'invalid-email' },
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getAllByText('Invalid email')).toHaveLength(1);
      });
    });

    it('should validate password length', async () => {
      render(<SignInForm />);

      fireEvent.input(screen.getByLabelText('Password'), {
        target: { value: 'pass' },
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getAllByText('String must contain at least 8 character(s)')
        ).toHaveLength(1);
      });
    });
  });

  describe('Form submission', () => {
    it('should submit the form with valid data', async () => {
      render(<SignInForm />);

      const userData = generateTestData('user');

      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(doRequestMock).toHaveBeenCalledTimes(1);
        expect(doRequestMock).toHaveBeenCalledWith({
          email: userData.email,
          password: userData.password,
        });
      });
    });

    it('should display loading state during form submission', async () => {
      useRequestMock.mockReturnValue({
        doRequest: doRequestMock,
        loading: true,
      });

      render(<SignInForm />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeDisabled();
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should handle successful form submission', async () => {
      useRequestMock.mockImplementation(({ onSuccess }) => {
        return {
          doRequest: (...args: unknown[]) => {
            doRequestMock
              .mockResolvedValue({})(...args)
              .then(() => onSuccess({ error: null, url: '/dashboard' }));
          },
          loading: false,
        };
      });

      render(<SignInForm />);

      const userData = generateTestData('user');

      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(refreshMock).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle form submission error', async () => {
      useRequestMock.mockImplementation(({ onSuccess }) => {
        return {
          doRequest: (...args: unknown[]) => {
            doRequestMock
              .mockResolvedValue({})(...args)
              .then(() =>
                onSuccess({ error: 'Invalid credentials', url: null })
              );
          },
          loading: false,
        };
      });

      render(<SignInForm />);

      const userData = generateTestData('user');

      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledTimes(1);
        expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
      });
    });

    it('should call signIn with correct arguments', async () => {
      useRequestMock.mockImplementation(
        jest.requireActual('@/hooks').useRequest
      );

      render(<SignInForm />);

      const userData = generateTestData('user');

      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith('credentials', {
          email: userData.email,
          password: userData.password,
          redirect: false,
        });
      });
    });
  });
});
