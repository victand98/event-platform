import { siteConfig } from '@/config';
import { cn } from '@/lib';
import { CalendarDaysIcon } from 'lucide-react';
import React from 'react';

export interface SiteFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SiteFooter: React.FC<SiteFooterProps> = (props) => {
  const { className } = props;

  return (
    <footer className={cn(className)}>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <CalendarDaysIcon data-testid='logo' />
          <p className='text-center text-sm leading-loose md:text-left'>
            Built by{' '}
            <a
              href={siteConfig.links.author}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              {siteConfig.author}
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export { SiteFooter };
