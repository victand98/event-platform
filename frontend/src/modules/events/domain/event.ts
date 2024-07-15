interface Event {
  id: number;
  title: string;
  comunity: string;
  image?: string;
  description: string;
  date: string;
  location: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { Event };
