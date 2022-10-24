import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../utils/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email: string = req.body?.email;
        const password: string = req.body?.password;
        if (email && password) {
          const user = await prisma.user.findFirst({
            where: {
              email,
              password,
            },
          });
          if (user) {
            console.log(user);
            return user;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      const email = session.user?.email;
      let isAdmin = false;
      let cartId;
      let cartCount;
      if (email) {
        const targetUser = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            cart: {
              include: {
                products: true,
              },
            },
          },
        });
        if (targetUser) {
          isAdmin = targetUser.isAdmin;
          cartId = targetUser.cart?.id;
          cartCount = targetUser.cart?.products.length;
        }
      }
      session.cartCount = cartCount;
      session.cartId = cartId;
      session.isAdmin = isAdmin;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
