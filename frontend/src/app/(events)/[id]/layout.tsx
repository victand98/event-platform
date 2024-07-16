import { buttonVariants, Separator } from '@/components';
import { cn } from '@/lib';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function EventLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <article className='container relative max-w-3xl py-6 lg:py-10'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-[-200px] top-14 hidden xl:inline-flex'
        )}
      >
        <ChevronLeftIcon className='mr-2 h-4 w-4' />
        See all events
      </Link>

      {children}

      <Separator className='mt-12' />

      <div className='flex justify-center py-6 lg:py-10'>
        <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }))}>
          <ChevronLeftIcon className='mr-2 h-4 w-4' />
          See all posts
        </Link>
      </div>
    </article>
  );
}
