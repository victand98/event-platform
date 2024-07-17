'use client';

import { DashboardSidebarItem } from '@/components';
import { siteConfig } from '@/config';
import { cn } from '@/lib';
import { SidebarNavItem } from '@/types';
import { CalendarCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface DashboardSidebarProps
  extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { items, className } = props;

  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex',
        className
      )}
    >
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='/'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <CalendarCheckIcon className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>{siteConfig.name}</span>
        </Link>

        {items.map((item, index) => (
          <DashboardSidebarItem key={index} item={item} pathname={pathname} />
        ))}
      </nav>

      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <DashboardSidebarItem
          item={{
            title: 'Sign Out',
            icon: 'LogOut',
            href: '/signout',
            items: [],
          }}
          pathname={pathname}
        />
      </nav>
    </aside>
  );
};

export { DashboardSidebar };
