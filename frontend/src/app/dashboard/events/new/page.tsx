import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CreateEventForm,
} from '@/components';

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
