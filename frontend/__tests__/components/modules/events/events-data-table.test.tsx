import { EventsDataTable } from '@/components';
import { eventRepository, getEventsUseCase } from '@/modules';
import React from 'react';
import { generateTestData, render } from '../../../../__utils__';

jest.mock('@/modules', () => ({
  ...jest.requireActual('@/modules'),
  getEventsUseCase: jest.fn(),
  eventRepository: {},
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  DataTable: jest.fn(() => (
    <div data-testid='data-table'>Mocked DataTable</div>
  )),
}));

describe('EventsDataTable', () => {
  const mockEvents = [generateTestData('event'), generateTestData('event')];

  it('should render DataTable with events data', async () => {
    (getEventsUseCase as jest.Mock).mockReturnValue(() =>
      Promise.resolve(mockEvents)
    );

    const { findByTestId } = render(
      (await EventsDataTable({})) as React.ReactElement
    );

    const dataTable = await findByTestId('data-table');
    expect(dataTable).toBeInTheDocument();

    expect(getEventsUseCase).toHaveBeenCalledTimes(1);
    expect(getEventsUseCase).toHaveBeenCalledWith(eventRepository);
    expect(getEventsUseCase).toHaveReturnedTimes(1);
  });
});
