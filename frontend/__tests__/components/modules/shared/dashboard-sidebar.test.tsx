import { DashboardSidebar, DashboardSidebarItemProps } from '@/components';
import { SidebarNavItem } from '@/types';
import { render, screen } from '../../../../__utils__';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test'),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  DashboardSidebarItem: ({ item, className }: DashboardSidebarItemProps) => (
    <div data-testid='sidebar-item' className={className}>
      {item.icon}
      {item.title}
    </div>
  ),
}));

describe('DashboardSidebar', () => {
  const mockItems: SidebarNavItem[] = [
    { title: 'Home', href: '/home', icon: 'AArrowDown', items: [] },
    { title: 'Profile', href: '/profile', icon: 'User', items: [] },
    { title: 'Settings', href: '/settings', icon: 'Settings', items: [] },
  ];

  it('should render correctly with multiple items', () => {
    render(<DashboardSidebar items={mockItems} />);

    const sidebarItems = screen.getAllByTestId('sidebar-item');
    expect(sidebarItems).toHaveLength(3);
    expect(sidebarItems[0]).toHaveTextContent('AArrowDown');
    expect(sidebarItems[1]).toHaveTextContent('Profile');
    expect(sidebarItems[2]).toHaveTextContent('Settings');
  });

  it('should apply correct className to items', () => {
    render(<DashboardSidebar items={mockItems} />);

    const sidebarItems = screen.getAllByTestId('sidebar-item');
    expect(sidebarItems[0]).not.toHaveClass('mt-auto');
    expect(sidebarItems[1]).toHaveClass('mt-auto');
    expect(sidebarItems[2]).toHaveClass('mt-auto');
  });

  it('should render correctly with no items', () => {
    render(<DashboardSidebar items={[]} />);

    expect(screen.queryByTestId('sidebar-item')).not.toBeInTheDocument();
  });

  it('should render with correct aside attributes', () => {
    render(<DashboardSidebar items={mockItems} />);

    const aside = screen.getByRole('complementary');
    expect(aside).toBeInTheDocument();
    expect(aside.tagName).toBe('ASIDE');
    expect(aside).toHaveClass('hidden sm:flex');
  });
});
