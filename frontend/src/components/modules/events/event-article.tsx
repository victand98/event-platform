import { AspectRatio, TypographyH2 } from '@/components';
import { Event } from '@/modules';
import { formatDate } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface EventArticleProps {
  event: Event;
  priority?: boolean;
}

const EventArticle: React.FC<EventArticleProps> = (props) => {
  const { event, priority } = props;

  return (
    <article key={event.id} className='group relative flex flex-col space-y-2'>
      <AspectRatio>
        <Image
          src={event.image || '/assets/img/placeholder.jpg'}
          alt={event.title}
          className='rounded-md border bg-muted transition-colors object-cover'
          priority={priority}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </AspectRatio>

      <TypographyH2 className='text-2xl font-extrabold'>
        {event.title}
      </TypographyH2>

      <p className='text-muted-foreground line-clamp-3'>{event.description}</p>

      <p className='text-sm text-muted-foreground'>
        {formatDate(event.date, 'PPp')}
      </p>

      <Link href={event.id.toString()} className='absolute inset-0'>
        <span className='sr-only'>View Event</span>
      </Link>
    </article>
  );
};

export { EventArticle };
