import { DashboardNav } from '@/components';
import { siteConfig } from '@/config';
import { SidebarNavItem } from '@/types';
import { render, screen } from '../../../../__utils__';

jest.mock('@/lib', () => ({
  cn: jest.fn((...args) => args.join(' ')),
}));

jest.mock('lucide-react', () => ({
  CalendarDaysIcon: () => <div data-testid='calendar-days-icon' />,
  LogOutIcon: () => <div data-testid='logout-icon' />,
  House: () => <div data-testid='home-icon' />,
  User: () => <div data-testid='user-icon' />,
}));

describe('DashboardNav', () => {
  const mockItems: SidebarNavItem[] = [
    { title: 'Home', icon: 'House', href: '/home', items: [] },
    { title: 'Profile', icon: 'User', href: '/profile', items: [] },
    { title: 'No Icon', href: '/no-icon', items: [] },
  ];

  it('should render correctly with provided items', () => {
    render(<DashboardNav items={mockItems} />);

    expect(screen.getByTestId('calendar-days-icon')).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();

    expect(screen.getByText('No Icon')).toBeInTheDocument();

    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(<DashboardNav items={mockItems} className={customClass} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(customClass);
    expect(nav).toHaveClass('grid gap-6 text-lg font-medium');
  });

  it('should render correct number of links', () => {
    render(<DashboardNav items={mockItems} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockItems.length + 2);
  });

  it('should render links with correct href attributes', () => {
    render(<DashboardNav items={mockItems} />);

    expect(screen.getByRole('link', { name: siteConfig.name })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/home'
    );
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute(
      'href',
      '/profile'
    );
    expect(screen.getByRole('link', { name: 'No Icon' })).toHaveAttribute(
      'href',
      '/no-icon'
    );
    expect(screen.getByRole('link', { name: 'Sign Out' })).toHaveAttribute(
      'href',
      '/signout'
    );
  });

  it('should render items without icons correctly', () => {
    const itemsWithoutIcons: SidebarNavItem[] = [
      { title: 'No Icon 1', href: '/no-icon-1', items: [] },
      { title: 'No Icon 2', href: '/no-icon-2', items: [] },
    ];

    render(<DashboardNav items={itemsWithoutIcons} />);

    expect(screen.getByText('No Icon 1')).toBeInTheDocument();
    expect(screen.getByText('No Icon 2')).toBeInTheDocument();
  });

  it('should render items without href correctly', () => {
    const itemsWithoutHref: SidebarNavItem[] = [
      { title: 'No Href 1', icon: 'House', items: [] },
      { title: 'No Href 2', icon: 'User', items: [] },
    ];

    render(<DashboardNav items={itemsWithoutHref} />);

    expect(screen.getByText('No Href 1')).toBeInTheDocument();
    expect(screen.getByText('No Href 2')).toBeInTheDocument();
  });
});
