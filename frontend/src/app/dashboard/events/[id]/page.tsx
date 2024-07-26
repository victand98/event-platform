import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  UpdateEventForm,
} from '@/components';
import { eventRepository, getEventUseCase } from '@/modules';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Event',
};

interface UpdateEventProps {
  params: { id: string };
}

export default async function UpdateEvent({ params }: UpdateEventProps) {
  const id = parseInt(params.id);
  const event = await getEventUseCase(eventRepository)(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Event</CardTitle>
        <CardDescription>
          Have you found a mistake? Update your event here.
        </CardDescription>
      </CardHeader>

      <UpdateEventForm event={event} />
    </Card>
  );
}
