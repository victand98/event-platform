'use client';

import { Button } from '@/components/ui';
import { signOut } from 'next-auth/react';
import React from 'react';

export interface SignOutButtonProps {}

const SignOutButton: React.FC<SignOutButtonProps> = () => {
  return (
    <Button className='w-full' onClick={() => signOut({ callbackUrl: '/' })}>
      Yes, sign me out
    </Button>
  );
};

export { SignOutButton };
