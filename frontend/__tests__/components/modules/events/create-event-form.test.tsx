import { CreateEventForm } from '@/components';
import { useRequest } from '@/hooks';
import { setFormError, toastError } from '@/lib';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  act,
  fireEvent,
  generateTestData,
  render,
  screen,
  waitFor,
} from '../../../../__utils__';

jest.mock('@/components/ui/date-time', () => ({
  ...jest.requireActual('@/components/ui/date-time'),
  DateTimePicker: ({ onJsDateChange, jsDate }: any) => (
    <input
      data-testid='date-time-picker'
      value={jsDate || ''}
      onChange={(e) => onJsDateChange(new Date(e.target.value))}
    />
  ),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks');
jest.mock('sonner');
jest.mock('@/lib');

describe('CreateEventForm', () => {
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
    it('should render all form fields', () => {
      render(<CreateEventForm />);

      expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Comunity/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
      expect(screen.getByText(/Event Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Publish Event/i)).toBeInTheDocument();
    });

    it('should render the submit button', () => {
      render(<CreateEventForm />);
      expect(
        screen.getByRole('button', { name: /create event/i })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    it('should display error messages for empty fields', async () => {
      render(<CreateEventForm />);

      const submitButton = screen.getByRole('button', {
        name: /create event/i,
      });
      submitButton.click();

      expect(
        await screen.findAllByText(
          'String must contain at least 3 character(s)'
        )
      ).toHaveLength(4);
      expect(
        await screen.findByText('Please select a valid date')
      ).toBeInTheDocument();
    });

    it('should display error message for invalid image url', async () => {
      render(<CreateEventForm />);

      await userEvent.type(screen.getByLabelText(/Image/i), 'invalid-url');
      fireEvent.click(screen.getByRole('button', { name: /create event/i }));

      await waitFor(() => {
        expect(screen.getByText('Invalid url')).toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    it('should submit the form with valid data', async () => {
      const { debug } = render(<CreateEventForm />);

      const eventData = generateTestData('event', {
        date: faker.date.future(),
      });

      await userEvent.type(screen.getByLabelText(/Title/i), eventData.title);
      await userEvent.type(
        screen.getByLabelText(/Description/i),
        eventData.description
      );
      await userEvent.type(
        screen.getByLabelText(/Comunity/i),
        eventData.comunity
      );
      await userEvent.type(
        screen.getByLabelText(/Image/i),
        eventData.image || ''
      );
      await userEvent.type(
        screen.getByLabelText(/Location/i),
        eventData.location
      );
      await userEvent.click(screen.getByLabelText(/Publish Event/i));
      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: eventData.date.toISOString() },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /create event/i }));

      await waitFor(() => {
        expect(doRequestMock).toHaveBeenCalledTimes(1);
        expect(doRequestMock).toHaveBeenCalledWith({
          title: eventData.title,
          description: eventData.description,
          comunity: eventData.comunity,
          image: eventData.image,
          location: eventData.location,
          date: eventData.date,
          published: true,
        });
      });
    });

    it('should display loading state during form submission', async () => {
      useRequestMock.mockReturnValue({ doRequestMock, loading: true });

      render(<CreateEventForm />);

      const submitButton = screen.getByRole('button', {
        name: /create event/i,
      });

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

      render(<CreateEventForm />);

      const eventData = generateTestData('event', {
        date: faker.date.future(),
      });

      await userEvent.type(screen.getByLabelText(/Title/i), eventData.title);
      await userEvent.type(
        screen.getByLabelText(/Description/i),
        eventData.description
      );
      await userEvent.type(
        screen.getByLabelText(/Comunity/i),
        eventData.comunity
      );
      await userEvent.type(
        screen.getByLabelText(/Image/i),
        eventData.image || ''
      );
      await userEvent.type(
        screen.getByLabelText(/Location/i),
        eventData.location
      );
      await userEvent.click(screen.getByLabelText(/Publish Event/i));
      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: eventData.date.toISOString() },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /create event/i }));

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith(
          'Event created successfully'
        );
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/dashboard/events');
      });
    });

    it('should handle form submission error', async () => {
      const error = new Error('Failed to create event');
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

      render(<CreateEventForm />);

      const eventData = generateTestData('event', {
        date: faker.date.future(),
      });

      await userEvent.type(screen.getByLabelText(/Title/i), eventData.title);
      await userEvent.type(
        screen.getByLabelText(/Description/i),
        eventData.description
      );
      await userEvent.type(
        screen.getByLabelText(/Comunity/i),
        eventData.comunity
      );
      await userEvent.type(
        screen.getByLabelText(/Image/i),
        eventData.image || ''
      );
      await userEvent.type(
        screen.getByLabelText(/Location/i),
        eventData.location
      );
      await userEvent.click(screen.getByLabelText(/Publish Event/i));
      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: eventData.date.toISOString() },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /create event/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalledTimes(1);
        expect(toastError).toHaveBeenCalledWith(error);
        expect(setFormError).toHaveBeenCalledTimes(1);
        expect(setFormError).toHaveBeenCalledWith(error, expect.any(Object));
      });
    });
  });
});
