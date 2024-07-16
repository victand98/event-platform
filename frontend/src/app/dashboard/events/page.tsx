import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EventsDataTable,
} from '@/components';
import { Suspense } from 'react';
import Loading from '../../loading';

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
        <Suspense fallback={<Loading />}>
          <EventsDataTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}
