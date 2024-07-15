import { APIError } from '@/modules';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  Event,
  EventCreateData,
  EventRepository,
  EventUpdateData,
} from '../../domain';

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

  const getAll = async (): Promise<Event[]> => {
    const session = await getServerSession();
    if (!session) {
      redirect('/signin');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 10 },
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
        next: { revalidate: 1000 },
      }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new APIError({ ...jsonResponse, statusCode: response.status });
    }
    return jsonResponse;
  };

  const update = async (id: number, data: EventUpdateData): Promise<Event> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/events/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
