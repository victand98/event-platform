import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SignUpForm,
} from '@/components';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

  return (
    <section className='w-full max-w-md'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-3xl font-bold'>Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>

      <div className='mt-4 text-center text-sm'>
        Already have an account?
        <Link className='underline ml-2' href='signin'>
          Sign In
        </Link>
      </div>
    </section>
  );
}
