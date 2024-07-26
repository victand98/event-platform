import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CreateEventForm,
} from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Event',
};

export default function NewEvent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Event</CardTitle>
        <CardDescription>
          Hurrah! You&apos;re creating a new event.
        </CardDescription>
      </CardHeader>

      <CreateEventForm />
    </Card>
  );
}
