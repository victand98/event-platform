import { DashboardSidebarSubItem } from '@/components';
import { SidebarNavItem } from '@/types';
import React from 'react';
import { render, screen } from '../../../../__utils__';

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Tooltip: ({ children }: React.PropsWithChildren) => (
    <div data-testid='tooltip'>{children}</div>
  ),
  TooltipTrigger: ({ children }: React.PropsWithChildren) => (
    <div data-testid='tooltip-trigger'>{children}</div>
  ),
  TooltipContent: ({ children }: React.PropsWithChildren) => (
    <div data-testid='tooltip-content'>{children}</div>
  ),
}));
jest.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));
jest.mock('lucide-react', () => ({
  AArrowDown: () => <div data-testid='lucide-icon' />,
}));

describe('DashboardSidebarSubitem', () => {
  const mockItem: SidebarNavItem = {
    title: 'Test',
    href: '/test',
    icon: 'AArrowDown',
    items: [],
  };

  it('should render correctly with icon', () => {
    render(<DashboardSidebarSubItem item={mockItem} pathname='/other' />);

    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-content')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toHaveAttribute('href', '/test');
    expect(screen.getByTestId('link')).toHaveClass(
      'text-muted-foreground hover:text-foreground'
    );
    expect(screen.getByTestId('lucide-icon')).toBeInTheDocument();
    expect(
      screen.getByText('Test', { selector: 'span.sr-only' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-content')).toHaveTextContent('Test');
  });

  it('should applies active styles when pathname matches href', () => {
    render(<DashboardSidebarSubItem item={mockItem} pathname='/test' />);

    expect(screen.getByTestId('link')).toHaveClass('text-foreground');
  });

  it('should render without icon when not provided', () => {
    const itemWithoutIcon = { ...mockItem, icon: undefined };
    render(
      <DashboardSidebarSubItem item={itemWithoutIcon} pathname='/other' />
    );

    expect(screen.queryByTestId('lucide-icon')).not.toBeInTheDocument();
  });

  it('should use "#" as href when not provided', () => {
    const itemWithoutHref = { ...mockItem, href: undefined };
    render(
      <DashboardSidebarSubItem item={itemWithoutHref} pathname='/other' />
    );

    expect(screen.getByTestId('link')).toHaveAttribute('href', '#');
  });
});
