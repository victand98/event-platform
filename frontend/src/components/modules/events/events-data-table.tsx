import { DataTable } from '@/components';
import { eventRepository, getEventsUseCase } from '@/modules';
import React from 'react';
import { eventColumns } from './events-columns';

export interface EventsDataTableProps {}

const EventsDataTable: React.FC<EventsDataTableProps> = async () => {
  const events = await getEventsUseCase(eventRepository)();

  return <DataTable columns={eventColumns} data={events} />;
};

export { EventsDataTable };
