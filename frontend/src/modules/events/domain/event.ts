interface Event {
  id: number;
  title: string;
  comunity: string;
  image: string | null;
  description: string;
  date: Date;
  location: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type { Event };
