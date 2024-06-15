class Event {
  id: number;
  title: string;
  comunity: string;
  image?: string;
  description: string;
  date: Date;
  location: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number = -1,
    title: string,
    comunity: string,
    description: string,
    date: Date,
    location: string,
    image?: string,
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
