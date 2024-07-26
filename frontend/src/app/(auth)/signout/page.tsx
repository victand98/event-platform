import {
  buttonVariants,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SignOutButton,
} from '@/components';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Out',
};

export default async function SignOutPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return (
    <section className='w-full max-w-md'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-3xl font-bold'>Sign Out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-col gap-2 justify-between md:flex-row'>
          <Link
            href='/'
            className={buttonVariants({
              variant: 'outline',
              className: 'w-full',
            })}
          >
            No, take me back
          </Link>

          <SignOutButton />
        </CardFooter>
      </Card>
    </section>
  );
}
