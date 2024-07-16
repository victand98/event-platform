import '@testing-library/jest-dom';

import { MainNav } from '@/components';
import { MainNavItem } from '@/types';
import { render, screen } from '../../../../__utils__';

jest.mock('next/navigation', () => ({
  useSelectedLayoutSegment: jest.fn(() => 'home'),
}));

describe('MainNav', () => {
  const mockItems: MainNavItem[] = [
    { title: 'Home', href: '/home' },
    { title: 'Profile', href: '/profile' },
    { title: 'Settings', href: '/settings' },
    { title: 'Disabled', disabled: true },
  ];

  it('should render correctly with multiple items', () => {
    render(<MainNav items={mockItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should apply correct className to items', () => {
    render(<MainNav items={mockItems} />);

    expect(screen.getByText('Home')).toHaveClass('text-foreground');
    expect(screen.getByText('Profile')).toHaveClass('text-foreground/60');
    expect(screen.getByText('Settings')).toHaveClass('text-foreground/60');
  });

  it('should render correctly with no items', () => {
    render(<MainNav items={[]} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('should render with correct div attributes', () => {
    render(<MainNav items={mockItems} />);

    const div = screen.getByRole('navigation');
    expect(div).toBeInTheDocument();
    expect(div.tagName).toBe('NAV');
    expect(div).toHaveClass('hidden gap-6 md:flex');
  });

  it('should render with correct link attributes', () => {
    render(<MainNav items={mockItems} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/home');
    expect(links[2]).toHaveAttribute('href', '/profile');
    expect(links[3]).toHaveAttribute('href', '/settings');
    expect(links[4]).toHaveAttribute('href', '#');
    expect(links[4]).toHaveClass('cursor-not-allowed opacity-80');
  });
});
