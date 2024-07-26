'use client';

import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';
import { cn, getInitials } from '@/lib';
import { LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export interface SiteDropdownMenuProps
  extends React.HTMLAttributes<HTMLElement> {}

const SiteDropdownMenu: React.FC<SiteDropdownMenuProps> = (props) => {
  const { className } = props;

  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className={cn('overflow-hidden rounded-full', className)}
        >
          <Avatar>
            <AvatarFallback>
              {getInitials(data?.user?.name || '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/signout'>
            <LogOutIcon className='mr-2 h-4 w-4' /> Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SiteDropdownMenu };
