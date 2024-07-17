import { MainNavItem, SidebarNavItem } from '@/types';

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Events',
    href: '/dashboard/events',
    icon: 'LayoutList',
    items: [],
  },
  {
    title: 'Create Event',
    href: '/dashboard/events/new',
    icon: 'CalendarPlus',
    items: [],
  },
];

const mainNavItems: MainNavItem[] = [
  {
    title: 'Events',
    href: '/dashboard/events',
  },
  {
    title: 'Create Event',
    href: '/dashboard/events/new',
  },
];

export { mainNavItems, sidebarNavItems };
