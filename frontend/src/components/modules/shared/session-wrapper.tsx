'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export interface SessionWrapperProps extends React.PropsWithChildren {}

const SessionWrapper: React.FC<SessionWrapperProps> = (props) => {
  const { children } = props;

  return <SessionProvider>{children}</SessionProvider>;
};

export { SessionWrapper };
