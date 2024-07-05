import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SignInForm,
} from '@/components';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <section className='w-full max-w-md'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-3xl font-bold'>Sign In</CardTitle>
          <CardDescription>
            Enter your details to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>

      <div className='mt-4 text-center text-sm'>
        Don&apos;t have an account?
        <Link className='underline ml-2' href='signup'>
          Sign Up
        </Link>
      </div>
    </section>
  );
}
