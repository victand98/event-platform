import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EventsDataTable,
} from '@/components';

export default function Events() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardDescription>
          Manage your events and share them with your friends.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <EventsDataTable />
      </CardContent>
    </Card>
  );
}
