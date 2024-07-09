'use client';

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { useRequest } from '@/hooks';
import { setFormError, toastError } from '@/lib';
import { signUpUseCase, userRepository, UserSignUpData } from '@/modules';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodTypeAny } from 'zod';

type UserSignUpRawShape = Record<
  keyof (UserSignUpData & { confirmPassword: string }),
  ZodTypeAny
>;
const formSchema = z
  .object<UserSignUpRawShape>({
    email: z.string().email(),
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim(),
    firstName: z.string().min(2).trim(),
    lastName: z.string().min(2).trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      return ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();

  const form = useForm<UserSignUpData & { confirmPassword: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
  });

  const { doRequest, loading } = useRequest({
    request: signUpUseCase(userRepository),
    onSuccess: () => {
      toast.success('Account created successfully');
      router.push('/signin');
    },
    onError: (error) => {
      toastError(error);
      setFormError(error, form);
    },
  });

  const onSubmit: SubmitHandler<UserSignUpData> = (values) => {
    doRequest(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com' {...field} />
              </FormControl>
              <FormDescription>
                You will use this email to sign in
              </FormDescription>
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
              <FormDescription>
                Save your password in a safe place
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='********' type='password' {...field} />
              </FormControl>
              <FormDescription>Your password must match</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={loading}>
          {loading && (
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
              data-testid='loader'
            />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export { SignUpForm };
