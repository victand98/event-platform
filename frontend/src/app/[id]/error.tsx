'use client';

import { Alert, AlertDescription, AlertTitle, Button } from '@/components';
import { AlertCircleIcon } from 'lucide-react';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Alert>
      <AlertCircleIcon className='w-4 h-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later.
      </AlertDescription>

      <Button onClick={reset} variant='link'>
        Try again
      </Button>
    </Alert>
  );
}
