import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/signin', error: '/signin' },
});

export const config = {
  matcher: ['/((?!signup|signin|api|_next/static|_next/image|favicon.ico).*)'],
};
