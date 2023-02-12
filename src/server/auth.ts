import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "../env/server.mjs";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    display_name: any;
    avatar: string;
    avatar_decoration: any;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: any;
    banner_color: string;
    accent_color: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    email: string;
    verified: boolean;
    image_url: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      display_name: any;
      avatar: string;
      avatar_decoration: any;
      discriminator: string;
      public_flags: number;
      flags: number;
      banner: any;
      banner_color: string;
      accent_color: number;
      locale: string;
      mfa_enabled: boolean;
      premium_type: number;
      email: string;
      verified: boolean;
      image_url: string;
    };
  }

  interface User {
    id: string;
    username: string;
    display_name: any;
    avatar: string;
    avatar_decoration: any;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: any;
    banner_color: string;
    accent_color: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    email: string;
    verified: boolean;
    image_url: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      session.user = token
      return session;
    },
    async jwt({ token, profile }) {
      return {
        ...token,
        ...profile,
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
