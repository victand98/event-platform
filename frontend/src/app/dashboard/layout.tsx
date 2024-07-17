import { DashboardHeader, DashboardSidebar } from '@/components';
import { sidebarNavItems } from '@/config';

export default function DashboardLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <DashboardSidebar items={sidebarNavItems} />

      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <DashboardHeader />

        <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          {children}
        </main>
      </div>
    </div>
  );
}
