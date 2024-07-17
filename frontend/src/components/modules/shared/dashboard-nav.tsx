import { siteConfig } from '@/config';
import { cn } from '@/lib';
import { SidebarNavItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[];
}

const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const { className, items } = props;

  return (
    <nav className={cn('grid gap-6 text-lg font-medium', className)}>
      <Link
        href='/'
        className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
      >
        <LucideIcons.CalendarDaysIcon className='h-5 w-5 transition-all group-hover:scale-110' />
        <span className='sr-only'>{siteConfig.name}</span>
      </Link>

      {items.map((item, index) => {
        const Icon = item.icon ? LucideIcons[item.icon] : null;
        return (
          <Link
            key={index}
            href={item?.href || '#'}
            className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
          >
            {Icon ? <Icon className='h-5 w-5' /> : null}
            {item.title}
          </Link>
        );
      })}

      <Link
        href='/signout'
        className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
      >
        <LucideIcons.LogOutIcon className='h-5 w-5' />
        Sign Out
      </Link>
    </nav>
  );
};

export { DashboardNav };
