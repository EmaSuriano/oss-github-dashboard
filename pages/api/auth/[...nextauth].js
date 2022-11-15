// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

// add providers with NextAuth
export default NextAuth({
  providers: [
    GitHubProvider({
      secret: process.env.SECRET,
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
