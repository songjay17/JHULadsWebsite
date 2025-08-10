import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user || !user.passwordHash) return null;
        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        return ok ? { id: user.id, email: user.email!, name: user.name ?? undefined } : null;
      }
    })
  ]
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig);
