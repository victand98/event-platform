'use client';

import { siteConfig } from '@/config';
import { cn } from '@/lib';
import { MainNavItem } from '@/types';
import { CalendarDaysIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

export interface MainNavProps {
  items: MainNavItem[];
}

const MainNav: React.FC<MainNavProps> = (props) => {
  const { items } = props;

  const segment = useSelectedLayoutSegment();

  return (
    <div className='flex gap-6 md:gap-10'>
      <Link href='/' className='flex items-center space-x-2'>
        <CalendarDaysIcon />
        <span className='font-bold'>{siteConfig.name}</span>
      </Link>

      <nav className='hidden gap-6 md:flex'>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href || '#'}
            className={cn(
              'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
              item.href?.startsWith(`/${segment}`)
                ? 'text-foreground'
                : 'text-foreground/60',
              item.disabled && 'cursor-not-allowed opacity-80'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export { MainNav };
