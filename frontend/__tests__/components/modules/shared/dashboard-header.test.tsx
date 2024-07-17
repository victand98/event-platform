import { DashboardHeader } from '@/components';
import { sidebarNavItems, siteConfig } from '@/config';
import React from 'react';
import { render, screen } from '../../../../__utils__';

jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  Button: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <button className={className}>{children}</button>,
  DashboardNav: ({ items }: { items: any[] }) => (
    <nav data-testid='dashboard-nav'>{items.length} items</nav>
  ),
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='sheet-content'>{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='sheet-trigger'>{children}</div>
  ),
  SiteBreadcrumbs: () => <div data-testid='site-breadcrumbs' />,
  SiteDropdownMenu: ({ className }: { className: string }) => (
    <div data-testid='site-dropdown-menu' className={className} />
  ),
}));

jest.mock('lucide-react', () => ({
  PanelLeftIcon: () => <div data-testid='panel-left-icon' />,
}));

jest.mock('@/lib', () => ({
  cn: jest.fn((...args) => args.join(' ')),
}));

describe('DashboardHeader', () => {
  it('should render correctly', () => {
    render(<DashboardHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('panel-left-icon')).toBeInTheDocument();
    expect(screen.getByText('Toggle Menu')).toBeInTheDocument();
    expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
    expect(screen.getByText(siteConfig.name)).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-nav')).toBeInTheDocument();
    expect(screen.getByTestId('site-breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('site-dropdown-menu')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(<DashboardHeader className={customClass} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(customClass);
    expect(header).toHaveClass(
      'sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'
    );
  });

  it('should render correct number of nav items', () => {
    render(<DashboardHeader />);

    expect(screen.getByTestId('dashboard-nav')).toHaveTextContent(
      `${sidebarNavItems.length} items`
    );
  });

  it('should apply correct classes to SiteDropdownMenu', () => {
    render(<DashboardHeader />);

    expect(screen.getByTestId('site-dropdown-menu')).toHaveClass('ml-auto');
  });

  it('should render SheetTitle with correct content and accessibility', () => {
    render(<DashboardHeader />);

    const sheetTitle = screen.getByText(siteConfig.name);
    expect(sheetTitle.tagName).toBe('H2');
  });
});
