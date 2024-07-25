'use client';

import {
  Button,
  CardContent,
  CardFooter,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
  Textarea,
} from '@/components';
import { revalidateEventsAction } from '@/components/modules/events';
import { DateTimePicker } from '@/components/ui/date-time';
import { useRequest } from '@/hooks';
import { setFormError, toastError } from '@/lib';
import {
  createEventUseCase,
  EventCreateData,
  eventRepository,
} from '@/modules';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodTypeAny } from 'zod';

type EventCreateRawShape = Record<keyof EventCreateData, ZodTypeAny>;
const formSchema = z.object<EventCreateRawShape>({
  comunity: z.string().min(3).trim(),
  date: z.date({ message: 'Please select a valid date' }).min(new Date()),
  description: z.string().min(3).trim(),
  location: z.string().min(3).trim(),
  title: z.string().min(3).trim(),
  published: z.boolean().optional(),
  image: z.union([z.string().url().trim().nullish(), z.literal('')]),
});

export interface CreateEventFormProps {}

const CreateEventForm: React.FC<CreateEventFormProps> = () => {
  const router = useRouter();

  const form = useForm<EventCreateData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comunity: '',
      description: '',
      date: null,
      image: '',
      location: '',
      published: false,
      title: '',
    },
  });

  const { doRequest, loading } = useRequest({
    request: createEventUseCase(eventRepository),
    onSuccess: () => {
      revalidateEventsAction();
      toast.success('Event created successfully');
      router.push('/dashboard/events');
    },
    onError: (error) => {
      toastError(error);
      setFormError(error, form);
    },
  });

  const onSubmit: SubmitHandler<EventCreateData> = (values) => {
    doRequest(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className='grid gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='My Awesome Event' {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Come on! Give your event a catchy title.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about your amazing event...'
                    rows={5}
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='comunity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comunity</FormLabel>
                  <FormControl>
                    <Input placeholder='Open Source Community' {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The name of the community hosting the event.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com/image.jpg'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='https://youtu.be/...' {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Online or physical location of the event.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity='second'
                      jsDate={field.value}
                      onJsDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    When will the event take place?
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className='border-t px-6 py-4 flex justify-between gap-3'>
          <Button type='submit' disabled={loading}>
            {loading && (
              <Loader2
                className='mr-2 h-4 w-4 animate-spin'
                data-testid='loader'
              />
            )}
            Create Event
          </Button>

          <FormField
            control={form.control}
            name='published'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <FormLabel>Publish Event</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardFooter>
      </form>
    </Form>
  );
};

export { CreateEventForm };
