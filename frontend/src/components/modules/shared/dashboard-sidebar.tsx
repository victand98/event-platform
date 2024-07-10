'use client';

import { DashboardSidebarItem } from '@/components';
import { SidebarNavItem } from '@/types';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface DashboardSidebarProps {
  items: SidebarNavItem[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { items } = props;

  const pathname = usePathname();

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      {items.map((item, index) => (
        <DashboardSidebarItem
          key={index}
          item={item}
          className={index > 0 ? 'mt-auto' : ''}
          pathname={pathname}
        />
      ))}
    </aside>
  );
};

export { DashboardSidebar };
