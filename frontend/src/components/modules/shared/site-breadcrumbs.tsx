'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export interface SiteBreadcrumbsProps {}

const SiteBreadcrumbs: React.FC<SiteBreadcrumbsProps> = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((segment) => segment !== '');

  const items = segments.map((segment, index) => ({
    isCurrentPage: index === segments.length - 1,
    href: `/${segments.slice(0, index + 1).join('/')}`,
    title: segment,
  }));

  return (
    <Breadcrumb className='hidden md:flex'>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className='capitalize'>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { SiteBreadcrumbs };
