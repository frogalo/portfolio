import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaAuth } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaAuth),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_KEY!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // const allowedEmail = process.env.ADMIN_EMAIL;
      // if (user.email === allowedEmail) {
      //   return true;
      // }
      // return false; // Restrict login to the ADMIN_EMAIL specified in .env
      return true; // Allowing any email for now
    },
    async session({ session, user }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
