import { APIError } from '@/modules';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import {
  Event,
  EventCreateData,
  EventRepository,
  EventUpdateData,
} from '../../domain';

const apiEventRepository = (): EventRepository => {
  const create = async (data: EventCreateData): Promise<Event> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError(jsonResponse);
    }
    return jsonResponse;
  };

  const getAll = async (): Promise<Event[]> => {
    await getServerSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 0, tags: ['/events'] },
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError(jsonResponse);
    }
    return jsonResponse;
  };

  const getById = async (id: number): Promise<Event> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events/${id}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 0 },
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError({ ...jsonResponse, statusCode: response.status });
    }
    return jsonResponse;
  };

  const update = async (id: number, data: EventUpdateData): Promise<Event> => {
    const session = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError({ ...jsonResponse, statusCode: response.status });
    }
    return jsonResponse;
  };

  return { create, getAll, getById, update };
};

export { apiEventRepository };
