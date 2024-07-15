import { cn } from '@/lib';
import React from 'react';

export interface TypographyH1Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const TypographyH1: React.FC<TypographyH1Props> = (props) => {
  const { children, className } = props;

  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-heading tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

export interface TypographyPProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographyP: React.FC<TypographyPProps> = (props) => {
  const { children, className } = props;

  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
};

export interface TypographyBlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {}

const TypographyBlockquote: React.FC<TypographyBlockquoteProps> = (props) => {
  const { children, className } = props;

  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
};

export { TypographyBlockquote, TypographyH1, TypographyP };
