import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { cn } from '@/lib';
import { SidebarNavItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export interface DashboardSidebarSubItemProps {
  item: SidebarNavItem;
  pathname: string;
}

const DashboardSidebarSubItem: React.FC<DashboardSidebarSubItemProps> = (
  props
) => {
  const { item, pathname } = props;

  const Icon = item.icon ? LucideIcons[item.icon] : null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item?.href || '#'}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
            pathname === item.href
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          data-testid='link'
        >
          {Icon && <Icon className='h-5 w-5' />}
          <span className='sr-only'>{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>{item.title}</TooltipContent>
    </Tooltip>
  );
};

export { DashboardSidebarSubItem };
