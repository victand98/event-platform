'use client';

import {
  Badge,
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components';
import { Event } from '@/modules';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      const comunity = row.original.comunity;
      return (
        <div className='flex flex-col items-start space-y-2'>
          <Badge variant='secondary' className='max-w-[150px] line-clamp-1'>
            {comunity}
          </Badge>
          <span className='line-clamp-3 font-medium pl-2.5'>
            {row.getValue('title')}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'published',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const published = row.getValue('published');
      return (
        <Badge variant={published ? 'default' : 'outline'}>
          {published ? 'Published' : 'Draft'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Location'
        className='justify-center'
      />
    ),
    cell: ({ row }) => {
      const location = row.original.location;
      return <div className='text-center'>{location}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Event Date' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const formattedDate = format(date, 'MMMM d, yyyy, h:mm a');
      return formattedDate;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/events/${id}`}>Edit event</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${id}`}>View event details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
