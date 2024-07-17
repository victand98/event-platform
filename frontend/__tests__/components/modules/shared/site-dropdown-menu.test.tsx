import { SiteDropdownMenu } from '@/components';
import { getInitials } from '@/lib';
import { SessionContextValue, useSession } from 'next-auth/react';
import React from 'react';
import { fireEvent, render, screen } from '../../../../__utils__';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/lib', () => ({
  getInitials: jest.fn(),
  cn: jest.fn((...args) => args.join(' ')),
}));

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='avatar'>{children}</div>
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='avatar-fallback'>{children}</div>
  ),
  Button: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <button className={className}>{children}</button>,
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-trigger'>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-content'>{children}</div>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-label'>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
  DropdownMenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('SiteDropdownMenu', () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
  const mockGetInitials = getInitials as jest.MockedFunction<
    typeof getInitials
  >;

  it('should render correctly with user session', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe' } },
    } as unknown as SessionContextValue);
    mockGetInitials.mockReturnValue('JD');

    render(<SiteDropdownMenu />);

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('JD');
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
  });

  it('should render correctly without user session', () => {
    mockUseSession.mockReturnValue({
      data: null,
    } as unknown as SessionContextValue);
    mockGetInitials.mockReturnValue('');

    render(<SiteDropdownMenu />);

    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('');
  });

  it('should apply custom className', () => {
    mockUseSession.mockReturnValue({
      data: null,
    } as unknown as SessionContextValue);

    render(<SiteDropdownMenu className='custom-class' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('overflow-hidden');
    expect(button).toHaveClass('rounded-full');
  });

  it('should render dropdown content correctly', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'John Doe' } },
    } as unknown as SessionContextValue);

    render(<SiteDropdownMenu />);

    fireEvent.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByTestId('dropdown-label')).toHaveTextContent('John Doe');
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign Out' })).toHaveAttribute(
      'href',
      '/signout'
    );
  });
});
