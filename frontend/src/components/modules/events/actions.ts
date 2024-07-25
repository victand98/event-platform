'use server';

import { revalidateTag } from 'next/cache';

export const revalidateEventsAction = (): void => {
  revalidateTag('/events');
};
