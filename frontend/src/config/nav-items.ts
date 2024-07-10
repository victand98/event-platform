import { SidebarNavItem } from '@/types';

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Event Platform',
    icon: 'CalendarCheck',
    href: '/',
    items: [
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
    ],
  },
];

export { sidebarNavItems };
