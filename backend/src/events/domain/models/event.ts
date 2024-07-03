class Event {
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

  constructor(
    title: string,
    comunity: string,
    description: string,
    date: Date,
    location: string,
    id: number = -1,
    image: string | null = null,
    published: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.comunity = comunity;
    this.image = image;
    this.description = description;
    this.date = date;
    this.location = location;
    this.published = published;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { Event };
