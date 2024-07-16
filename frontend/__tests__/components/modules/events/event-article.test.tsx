import { EventArticle } from '@/components';
import { formatDate } from 'date-fns';
import React from 'react';
import { generateTestData, render, screen } from '../../../../__utils__';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => (
    <img {...props} fill={`${props.fill}`} priority={`${props.priority}`} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock de los componentes personalizados
jest.mock('@/components', () => ({
  ...jest.requireActual('@/components'),
  AspectRatio: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='aspect-ratio'>{children}</div>
  ),
  TypographyH2: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => <h2 className={className}>{children}</h2>,
}));

describe('EventArticle', () => {
  const mockEvent = generateTestData('event');

  it('should render event details correctly', () => {
    render(<EventArticle event={mockEvent} />);

    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();

    const descriptionPattern = new RegExp(
      `^${mockEvent.description.slice(0, 100)}`
    );
    expect(screen.getByText(descriptionPattern)).toBeInTheDocument();

    expect(
      screen.getByText(formatDate(mockEvent.date, 'PPp'))
    ).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockEvent.image);
    expect(image).toHaveAttribute('alt', mockEvent.title);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockEvent.id.toString());
    expect(link).toHaveTextContent('View Event');
  });

  it('should use placeholder image when no image is provided', () => {
    const eventWithoutImage = { ...mockEvent, image: undefined };
    render(<EventArticle event={eventWithoutImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/assets/img/placeholder.jpg');
  });

  it('should apply priority to image when specified', () => {
    render(<EventArticle event={mockEvent} priority />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('priority', 'true');
  });

  it('should render within AspectRatio component', () => {
    render(<EventArticle event={mockEvent} />);

    expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument();
  });
});
