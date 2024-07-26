import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EventsDataTable,
} from '@/components';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from '../../loading';

export const metadata: Metadata = {
  title: 'Events',
};

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
