import { SignUpForm } from '@/components';
import { useRequest } from '@/hooks';
import { setFormError, toastError } from '@/lib';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
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

describe('SignUpForm', () => {
  const useRequestMock = useRequest as jest.Mock;
  const useRouterMock = useRouter as jest.Mock;
  const doRequestMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    useRequestMock.mockReturnValue({
      doRequest: doRequestMock,
      loading: false,
    });
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  describe('Rendering', () => {
    it('should render all form fields with correct labels and placeholders', () => {
      render(<SignUpForm />);

      expect(screen.getByLabelText('First Name')).toHaveAttribute(
        'placeholder',
        'John'
      );
      expect(screen.getByLabelText('Last Name')).toHaveAttribute(
        'placeholder',
        'Doe'
      );
      expect(screen.getByLabelText('Email')).toHaveAttribute(
        'placeholder',
        'email@example.com'
      );
      expect(screen.getByLabelText('Password')).toHaveAttribute(
        'placeholder',
        '********'
      );
      expect(screen.getByLabelText('Confirm Password')).toHaveAttribute(
        'placeholder',
        '********'
      );
    });

    it('should render the submit button', () => {
      render(<SignUpForm />);
      expect(
        screen.getByRole('button', { name: /sign up/i })
      ).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should display error messages for empty fields', async () => {
      render(<SignUpForm />);
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(
          screen.getAllByText('String must contain at least 2 character(s)')
        ).toHaveLength(2);
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(
          screen.getAllByText('String must contain at least 8 character(s)')
        ).toHaveLength(2);
      });
    });

    it('should validate email format', async () => {
      render(<SignUpForm />);
      await userEvent.type(screen.getByLabelText('Email'), 'invalidemail');
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
      });
    });

    it('should validate password length', async () => {
      render(<SignUpForm />);
      await userEvent.type(
        screen.getByLabelText('Password'),
        faker.word.sample(5)
      );
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        faker.word.sample(8)
      );
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(
          screen.getByText('String must contain at least 8 character(s)')
        ).toBeInTheDocument();
      });
    });

    it('should validates password match', async () => {
      render(<SignUpForm />);
      await userEvent.type(
        screen.getByLabelText('Password'),
        faker.internet.password({ length: 8 })
      );
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        faker.internet.password({ length: 8 })
      );
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit the form with valid data', async () => {
      render(<SignUpForm />);

      const userData = generateTestData('user');

      await userEvent.type(
        screen.getByLabelText('First Name'),
        userData.firstName
      );
      await userEvent.type(
        screen.getByLabelText('Last Name'),
        userData.lastName
      );
      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(doRequestMock).toHaveBeenCalledTimes(1);
        expect(doRequestMock).toHaveBeenCalledWith({
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      });
    });

    it('should display loading state during form submission', async () => {
      useRequestMock.mockReturnValue({ doRequestMock, loading: true });

      render(<SignUpForm />);

      const submitButton = screen.getByRole('button', { name: /sign up/i });
      expect(submitButton).toBeDisabled();
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should handle successful form submission', async () => {
      useRequestMock.mockImplementation(({ onSuccess }) => {
        return {
          doRequest: (...args: unknown[]) => {
            doRequestMock
              .mockResolvedValue({})(...args)
              .then(() => onSuccess());
          },
          loading: false,
        };
      });

      render(<SignUpForm />);

      const userData = generateTestData('user');

      await userEvent.type(
        screen.getByLabelText('First Name'),
        userData.firstName
      );
      await userEvent.type(
        screen.getByLabelText('Last Name'),
        userData.lastName
      );
      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith(
          'Account created successfully'
        );
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/signin');
      });
    });

    it('should handle form submission error', async () => {
      const error = new Error('Failed to create account');
      useRequestMock.mockImplementation(({ onError }) => {
        return {
          doRequest: (...args: unknown[]) => {
            doRequestMock
              .mockRejectedValue(error)(...args)
              .catch(() => onError(error));
          },
          loading: false,
        };
      });

      render(<SignUpForm />);

      const userData = generateTestData('user');

      await userEvent.type(
        screen.getByLabelText('First Name'),
        userData.firstName
      );
      await userEvent.type(
        screen.getByLabelText('Last Name'),
        userData.lastName
      );
      await userEvent.type(screen.getByLabelText('Email'), userData.email);
      await userEvent.type(
        screen.getByLabelText('Password'),
        userData.password
      );
      await userEvent.type(
        screen.getByLabelText('Confirm Password'),
        userData.password
      );

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalledTimes(1);
        expect(toastError).toHaveBeenCalledWith(error);
        expect(setFormError).toHaveBeenCalledTimes(1);
        expect(setFormError).toHaveBeenCalledWith(error, expect.any(Object));
      });
    });
  });
});
