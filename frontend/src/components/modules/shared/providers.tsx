'use client';

import { TooltipProvider } from '@/components';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export interface ProvidersProps extends React.PropsWithChildren {}

const Providers: React.FC<ProvidersProps> = (props) => {
  const { children } = props;

  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
};

export { Providers };
