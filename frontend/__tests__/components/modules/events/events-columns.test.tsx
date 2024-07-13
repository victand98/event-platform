import { eventColumns } from '@/components';
import { Event } from '@/modules';
import { ColumnDef } from '@tanstack/react-table';
import { generateTestData, render, screen } from '../../../../__utils__';

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Badge: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => <span data-testid={`badge-${variant}`}>{children}</span>,
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  DataTableColumnHeader: ({ title }: { title: string }) => <div>{title}</div>,
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('date-fns', () => ({
  format: jest.fn(() => 'Mocked Date'),
}));

type EventColumnDef = ColumnDef<Event> & {
  accessorKey: keyof Event;
  cell: (cell: unknown) => React.ReactNode;
};

describe('eventColumns', () => {
  const mockEvent = generateTestData('event');

  const mockColumn = {
    column: {
      getToggleSortingHandler: jest.fn(),
      getIsSorted: jest.fn(),
    },
  };

  it('should render title column correctly', () => {
    const titleColumn = (eventColumns as EventColumnDef[]).find(
      (col) => col.accessorKey === 'title'
    );
    const cell = titleColumn!.cell({
      row: { original: mockEvent, getValue: () => mockEvent.title },
    });

    render(<>{cell}</>);

    expect(screen.getByTestId('badge-secondary')).toHaveTextContent(
      mockEvent.comunity
    );
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
  });

  it('should render published column correctly', () => {
    const publishedColumn = (eventColumns as EventColumnDef[]).find(
      (col) => col.accessorKey === 'published'
    );
    const cell = publishedColumn!.cell({ row: { getValue: () => true } });
    render(<>{cell}</>);

    expect(screen.getByTestId('badge-default')).toHaveTextContent('Published');

    const cellDraft = publishedColumn!.cell({ row: { getValue: () => false } });
    render(<>{cellDraft}</>);

    expect(screen.getByTestId('badge-outline')).toHaveTextContent('Draft');
  });

  it('should render location column correctly', () => {
    const locationColumn = (eventColumns as EventColumnDef[]).find(
      (col) => col.accessorKey === 'location'
    );
    const cell = locationColumn!.cell({
      row: { original: mockEvent, getValue: () => mockEvent.location },
    });

    render(<>{cell}</>);

    expect(screen.getByText(mockEvent.location)).toBeInTheDocument;
  });

  it('should render date column correctly', () => {
    const dateColumn = (eventColumns as EventColumnDef[]).find(
      (col) => col.accessorKey === 'date'
    );
    const cell = dateColumn!.cell({
      row: { getValue: () => mockEvent.date },
    });

    render(<>{cell}</>);

    expect(screen.getByText('Mocked Date')).toBeInTheDocument();
  });

  it('should render actions column correctly', () => {
    const actionsColumn = (eventColumns as EventColumnDef[]).find(
      (col) => col.id === 'actions'
    );
    const cell = actionsColumn!.cell({ row: { original: mockEvent } });

    render(<>{cell}</>);

    expect(screen.getByText('Open menu')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('View event details')).toBeInTheDocument();
    expect(screen.getByText('Edit event')).toBeInTheDocument();
  });

  it('should render column headers correctly', () => {
    (eventColumns as EventColumnDef[]).forEach((column) => {
      if (column.header && typeof column.header === 'function') {
        const header = column.header(mockColumn as any);
        render(<>{header}</>);

        if (column.accessorKey === 'title') {
          expect(screen.getByText('Title')).toBeInTheDocument();
        } else if (column.accessorKey === 'published') {
          expect(screen.getByText('Status')).toBeInTheDocument();
        } else if (column.accessorKey === 'location') {
          expect(screen.getByText('Location')).toBeInTheDocument();
        } else if (column.accessorKey === 'date') {
          expect(screen.getByText('Event Date')).toBeInTheDocument();
        }
      }
    });
  });
});
