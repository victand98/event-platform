import { buttonVariants, MainNav, SiteFooter } from '@/components';
import { mainNavItems } from '@/config';
import { cn } from '@/lib';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

export default async function HomeLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  const session = await getServerSession();

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='container z-40 bg-background'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav items={mainNavItems} />
          {!session ? (
            <nav>
              <Link
                href='/signin'
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4'
                )}
              >
                Sign In
              </Link>
            </nav>
          ) : null}
        </div>
      </header>

      <main className='flex-1'>{children}</main>

      <SiteFooter />
    </div>
  );
}
