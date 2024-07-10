import { DashboardSidebarSubItem } from '@/components';
import { cn } from '@/lib';
import { SidebarNavItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export interface DashboardSidebarItemProps {
  item: SidebarNavItem;
  className?: string;
  pathname: string;
}

const DashboardSidebarItem: React.FC<DashboardSidebarItemProps> = (props) => {
  const { item, className, pathname } = props;

  const Icon = item.icon ? LucideIcons[item.icon] : null;

  return (
    <nav
      className={cn('flex flex-col items-center gap-4 px-2 sm:py-5', className)}
    >
      <Link
        href={item?.href || '#'}
        className={cn(
          'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold md:h-8 md:w-8 md:text-base',
          pathname === item.href
            ? 'bg-primary-foreground text-primary'
            : 'text-primary-foreground'
        )}
        data-testid='link'
      >
        {Icon && (
          <Icon className='h-4 w-4 transition-all group-hover:scale-110' />
        )}
        <span className='sr-only'>{item.title}</span>
      </Link>

      {item.items.map((subItem, index) => (
        <DashboardSidebarSubItem
          key={index}
          item={subItem}
          pathname={pathname}
        />
      ))}
    </nav>
  );
};

export { DashboardSidebarItem };
