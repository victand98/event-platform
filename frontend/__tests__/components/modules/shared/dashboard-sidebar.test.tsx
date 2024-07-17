import { DashboardSidebar } from '@/components';
import { siteConfig } from '@/config';
import { SidebarNavItem } from '@/types';
import { render, screen } from '../../../../__utils__';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test'),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  DashboardSidebarItem: ({ item }: { item: SidebarNavItem }) => (
    <div data-testid={`sidebar-item-${item.title}`}>{item.title}</div>
  ),
}));

jest.mock('lucide-react', () => ({
  CalendarCheckIcon: () => <div data-testid='calendar-check-icon' />,
}));

describe('DashboardSidebar', () => {
  const mockItems: SidebarNavItem[] = [
    { title: 'Home', icon: 'House', href: '/', items: [] },
    { title: 'Profile', icon: 'User', href: '/profile', items: [] },
  ];

  it('should render correctly with multiple items', () => {
    render(<DashboardSidebar items={mockItems} />);

    expect(screen.getByTestId('calendar-check-icon')).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-Home')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-Profile')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-item-Sign Out')).toBeInTheDocument();
  });

  it('should apply correct className', () => {
    const customClass = 'custom-class';

    render(<DashboardSidebar items={mockItems} className={customClass} />);

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass(customClass);
  });

  it('should render the correct number of items', () => {
    render(<DashboardSidebar items={mockItems} />);

    const sidebarItems = screen.getAllByTestId(/^sidebar-item-/);
    expect(sidebarItems).toHaveLength(mockItems.length + 1);
  });

  it('should render the site logo link correctly', () => {
    render(<DashboardSidebar items={mockItems} />);

    const logoLink = screen.getByRole('link', { name: siteConfig.name });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
