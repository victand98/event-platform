import {
  Avatar,
  AvatarFallback,
  TypographyBlockquote,
  TypographyH1,
  TypographyP,
} from '@/components';
import { getInitials } from '@/lib';
import { eventRepository, getEventUseCase } from '@/modules';
import { formatDate } from 'date-fns';
import Image from 'next/image';

interface EventProps {
  params: { id: string };
}

export default async function Event({ params }: EventProps) {
  const id = parseInt(params.id);
  const event = await getEventUseCase(eventRepository)(id);

  return (
    <div>
      <time
        dateTime={event.date}
        className='block text-sm text-muted-foreground'
      >
        Taking place on {formatDate(new Date(event.date), 'MMMM do, yyyy')}
      </time>

      <TypographyH1 className='mt-2 inline-block leading-tight'>
        {event.title}
      </TypographyH1>

      <div className='mt-4 flex items-center space-x-4'>
        <Avatar className='h-9 w-9'>
          <AvatarFallback>{getInitials(event.comunity)}</AvatarFallback>
        </Avatar>

        <span className='text-sm font-medium leading-none'>
          {event.comunity}
        </span>
      </div>

      <Image
        src={event.image || '/assets/img/placeholder.jpg'}
        alt={event.title}
        width={720}
        height={405}
        className='my-8 rounded-md border bg-muted transition-colors'
        priority
      />

      <TypographyP>{event.description}</TypographyP>

      <TypographyBlockquote className='[&>*]:text-muted-foreground not-italic'>
        This event is taking place at <strong>{event.location}</strong> on{' '}
        <strong>{formatDate(new Date(event.date), 'PPPppp')}</strong>.
      </TypographyBlockquote>
    </div>
  );
}
