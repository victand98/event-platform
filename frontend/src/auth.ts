import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInUseCase, userRepository, UserSignInData } from './modules';

export const handler = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const response = await signInUseCase(userRepository)(
          credentials as UserSignInData
        );
        if ('errors' in response) {
          throw new Error(response.errors[0].message);
        }

        return {
          ...response,
          id: response.id.toString(),
          name: `${response.firstName} ${response.lastName}`,
        };
      },
    }),
  ],

  pages: { signIn: '/signin', error: '/signin', signOut: '/signout' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
