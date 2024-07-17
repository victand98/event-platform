import {
  Button,
  DashboardNav,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SiteBreadcrumbs,
  SiteDropdownMenu,
} from '@/components';
import { sidebarNavItems, siteConfig } from '@/config';
import { cn } from '@/lib';
import { PanelLeftIcon } from 'lucide-react';
import React from 'react';

export interface DashboardHeaderProps
  extends React.HTMLAttributes<HTMLElement> {}

const DashboardHeader: React.FC<DashboardHeaderProps> = (props) => {
  const { className } = props;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6',
        className
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeftIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side='left' className='sm:max-w-xs'>
          <SheetTitle className='sr-only'>{siteConfig.name}</SheetTitle>
          <DashboardNav items={sidebarNavItems} />
        </SheetContent>
      </Sheet>
      <SiteBreadcrumbs />
      <SiteDropdownMenu className='ml-auto' />
    </header>
  );
};

export { DashboardHeader };
