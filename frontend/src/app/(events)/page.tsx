import {
  EventArticle,
  Separator,
  TypographyH1,
  TypographyLead,
  TypographyP,
} from '@/components';
import { siteConfig } from '@/config';
import { eventRepository, getEventsUseCase } from '@/modules';

export default async function Home() {
  const events = await getEventsUseCase(eventRepository)(true);

  return (
    <div className='container max-w-4xl py-6 lg:py-10'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className='flex-1 space-y-4'>
          <TypographyH1 className='inline-block'>
            {siteConfig.name}
          </TypographyH1>

          <TypographyLead>{siteConfig.description}</TypographyLead>
        </div>
      </div>

      <Separator className='my-8' />

      {events.length > 0 ? (
        <div className='grid gap-10 sm:grid-cols-2'>
          {events.map((event, index) => (
            <EventArticle key={event.id} event={event} priority={index <= 1} />
          ))}
        </div>
      ) : (
        <TypographyP>No events published.</TypographyP>
      )}
    </div>
  );
}
