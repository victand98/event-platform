import { UpdateEventForm } from '@/components';
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

jest.mock('@/components/modules/events', () => ({
  ...jest.requireActual('@/components/modules/events'),
  revalidateEventsAction: jest.fn(),
}));
jest.mock('@/components/ui/date-time', () => ({
  ...jest.requireActual('@/components/ui/date-time'),
  DateTimePicker: ({ onJsDateChange, jsDate, defaultValue }: any) => (
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

describe('UpdateEventForm', () => {
  const useRequestMock = useRequest as jest.Mock;
  const useRouterMock = useRouter as jest.Mock;
  const doRequestMock = jest.fn();
  const pushMock = jest.fn();
  const event = generateTestData('event');

  beforeEach(() => {
    useRequestMock.mockReturnValue({
      doRequest: doRequestMock,
      loading: false,
    });
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<UpdateEventForm event={event} />);

      expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Comunity/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
      expect(screen.getByText(/Event Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Publish Event/i)).toBeInTheDocument();
    });

    it('should render the submit button', () => {
      render(<UpdateEventForm event={event} />);
      expect(
        screen.getByRole('button', { name: /update event/i })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    it('should display error messages for empty fields', async () => {
      render(<UpdateEventForm event={event} />);

      await userEvent.clear(screen.getByLabelText(/Title/i));
      await userEvent.clear(screen.getByLabelText(/Description/i));
      await userEvent.clear(screen.getByLabelText(/Comunity/i));
      await userEvent.clear(screen.getByLabelText(/Image/i));
      await userEvent.clear(screen.getByLabelText(/Location/i));
      await userEvent.click(screen.getByLabelText(/Publish Event/i));
      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: null },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /update event/i }));

      expect(
        await screen.findAllByText(
          'String must contain at least 3 character(s)'
        )
      ).toHaveLength(4);
      expect(await screen.findByText('Invalid date')).toBeInTheDocument();
    });

    it('should display error message for invalid image url', async () => {
      render(<UpdateEventForm event={event} />);

      await userEvent.clear(screen.getByLabelText(/Image/i));
      await userEvent.type(screen.getByLabelText(/Image/i), 'invalid-url');
      fireEvent.click(screen.getByRole('button', { name: /update event/i }));

      await waitFor(() => {
        expect(screen.getByText('Invalid url')).toBeInTheDocument();
      });
    });
  });

  describe('Form submission', () => {
    it('should submit the form with valid data', async () => {
      render(<UpdateEventForm event={event} />);

      const eventData = generateTestData('event', {
        date: faker.date.future().toISOString(),
      });

      await userEvent.clear(screen.getByLabelText(/Title/i));
      await userEvent.clear(screen.getByLabelText(/Description/i));
      await userEvent.clear(screen.getByLabelText(/Comunity/i));
      await userEvent.clear(screen.getByLabelText(/Image/i));
      await userEvent.clear(screen.getByLabelText(/Location/i));

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
          target: { value: eventData.date },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /update event/i }));

      await waitFor(() => {
        expect(doRequestMock).toHaveBeenCalledTimes(1);
        expect(doRequestMock).toHaveBeenCalledWith(event.id, {
          title: eventData.title,
          description: eventData.description,
          comunity: eventData.comunity,
          image: eventData.image,
          location: eventData.location,
          date: new Date(eventData.date),
          published: !event.published,
        });
      });
    });

    it('should display loading state during form submission', async () => {
      useRequestMock.mockReturnValue({ doRequestMock, loading: true });

      render(<UpdateEventForm event={event} />);

      const submitButton = screen.getByRole('button', {
        name: /update event/i,
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

      render(<UpdateEventForm event={event} />);

      const eventData = generateTestData('event', {
        date: faker.date.future().toISOString(),
      });

      await userEvent.clear(screen.getByLabelText(/Title/i));
      await userEvent.type(screen.getByLabelText(/Title/i), eventData.title);

      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: eventData.date },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /update event/i }));

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledTimes(1);
        expect(toast.success).toHaveBeenCalledWith(
          'Event updated successfully'
        );
        expect(pushMock).toHaveBeenCalledTimes(1);
        expect(pushMock).toHaveBeenCalledWith('/dashboard/events');
      });
    });

    it('should handle form submission error', async () => {
      const error = new Error('An error occurred');
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

      render(<UpdateEventForm event={event} />);

      const eventData = generateTestData('event', {
        date: faker.date.future().toISOString(),
      });

      await userEvent.clear(screen.getByLabelText(/Title/i));
      await userEvent.type(screen.getByLabelText(/Title/i), eventData.title);

      act(() => {
        fireEvent.change(screen.getByTestId('date-time-picker'), {
          target: { value: eventData.date },
        });
      });

      fireEvent.click(screen.getByRole('button', { name: /update event/i }));

      await waitFor(() => {
        expect(toastError).toHaveBeenCalledTimes(1);
        expect(toastError).toHaveBeenCalledWith(error);
        expect(setFormError).toHaveBeenCalledTimes(1);
        expect(setFormError).toHaveBeenCalledWith(error, expect.any(Object));
      });
    });
  });
});
