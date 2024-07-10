import {
  DashboardSidebarItem,
  DashboardSidebarSubItemProps,
} from '@/components';
import { SidebarNavItem } from '@/types';
import { render, screen } from '../../../../__utils__';

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  DashboardSidebarSubItem: ({ item }: DashboardSidebarSubItemProps) => (
    <div data-testid='sidebar-sub-item'>{item.title}</div>
  ),
}));
jest.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));
jest.mock('lucide-react', () => ({
  AArrowDown: () => <div data-testid='lucide-icon' />,
}));

describe('DashboardSidebarItem', () => {
  const mockItem: SidebarNavItem = {
    title: 'Home',
    href: '/home',
    icon: 'AArrowDown',
    items: [
      { title: 'SubItem1', href: '/sub1', items: [] },
      { title: 'SubItem2', href: '/sub2', items: [] },
    ],
  };

  it('should render correctly with icon and sub-items', () => {
    render(<DashboardSidebarItem item={mockItem} pathname='/other' />);

    expect(screen.getByTestId('link')).toHaveAttribute('href', '/home');
    expect(screen.getByTestId('link')).toHaveClass('text-primary-foreground');
    expect(screen.getByTestId('lucide-icon')).toBeInTheDocument();
    expect(
      screen.getByText('Home', { selector: 'span.sr-only' })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('sidebar-sub-item')).toHaveLength(2);
    expect(screen.getByText('SubItem1')).toBeInTheDocument();
    expect(screen.getByText('SubItem2')).toBeInTheDocument();
  });

  it('should apply active styles when pathname matches href', () => {
    render(<DashboardSidebarItem item={mockItem} pathname='/home' />);

    expect(screen.getByTestId('link')).toHaveClass(
      'bg-primary-foreground text-primary'
    );
  });

  it('should renders without icon when not provided', () => {
    const itemWithoutIcon = { ...mockItem, icon: undefined };
    render(<DashboardSidebarItem item={itemWithoutIcon} pathname='/other' />);

    expect(screen.queryByTestId('lucide-icon')).not.toBeInTheDocument();
  });

  it('should use "#" as href when not provided', () => {
    const itemWithoutHref = { ...mockItem, href: undefined };
    render(<DashboardSidebarItem item={itemWithoutHref} pathname='/other' />);

    expect(screen.getByTestId('link')).toHaveAttribute('href', '#');
  });

  it('should apply additional className when provided', () => {
    render(
      <DashboardSidebarItem
        item={mockItem}
        pathname='/other'
        className='test-class'
      />
    );

    expect(screen.getByRole('navigation')).toHaveClass('test-class');
  });
});
