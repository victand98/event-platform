import React from 'react';

export default function AuthLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-2'>
      {children}
    </div>
  );
}
