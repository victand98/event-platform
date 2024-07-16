'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { useRequest } from '@/hooks';
import { UserSignInData } from '@/modules';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodTypeAny } from 'zod';

type UserSignInRawShape = Record<keyof UserSignInData, ZodTypeAny>;
const formSchema = z.object<UserSignInRawShape>({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = () => {
  const router = useRouter();

  const form = useForm<UserSignInData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const { doRequest, loading } = useRequest({
    request: async (values) =>
      await signIn('credentials', { ...values, redirect: false }),
    onSuccess: (res) => {
      if (!res) return;
      const { error, url } = res;

      if (error) {
        toast.error(error);
      }
      if (url) {
        router.refresh();
      }
    },
  });

  const onSubmit: SubmitHandler<UserSignInData> = (values) => {
    doRequest(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='********' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export { SignInForm };
