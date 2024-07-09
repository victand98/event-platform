import { APIError } from '@/modules';
import { Event, EventCreateData, EventRepository } from '../../domain';

const apiEventRepository = (): EventRepository => {
  const create = async (data: EventCreateData): Promise<Event> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError(jsonResponse);
    }
    return jsonResponse;
  };

  return { create };
};

export { apiEventRepository };
