import { SiteBreadcrumbs } from '@/components';
import { usePathname } from 'next/navigation';
import { render, screen } from '../../../../__utils__';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('SiteBreadcrumbs', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<
    typeof usePathname
  >;

  it('should render correctly for root path', () => {
    mockUsePathname.mockReturnValue('/');
    render(<SiteBreadcrumbs />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render correctly for single-level path', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<SiteBreadcrumbs />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('dashboard')).toBeInTheDocument();
  });

  it('should render correctly for multi-level path', () => {
    mockUsePathname.mockReturnValue('/dashboard/settings/profile');
    render(<SiteBreadcrumbs />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/dashboard');
    expect(links[1]).toHaveAttribute('href', '/dashboard/settings');
    expect(links[2]).not.toHaveAttribute('href');

    expect(screen.getByText('profile')).toBeInTheDocument();
  });

  it('should apply correct classes', () => {
    mockUsePathname.mockReturnValue('/dashboard');
    render(<SiteBreadcrumbs />);

    expect(screen.getByRole('navigation')).toHaveClass('hidden md:flex');
    expect(screen.getByRole('list')).toHaveClass('flex');
    expect(screen.getByRole('listitem')).toHaveClass('capitalize');
  });

  it('should handle empty segments correctly', () => {
    mockUsePathname.mockReturnValue('/dashboard//settings');
    render(<SiteBreadcrumbs />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('dashboard')).toBeInTheDocument();
    expect(screen.getByText('settings')).toBeInTheDocument();
  });
});
