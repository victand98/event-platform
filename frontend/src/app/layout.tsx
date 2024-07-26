import { siteConfig } from '@/config';
import './globals.css';

import { Providers, Toaster } from '@/components';
import { cn } from '@/lib';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.links.author }],
  creator: siteConfig.author,
  keywords: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
};

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <html lang='en' suppressHydrationWarning>
      <Providers>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
