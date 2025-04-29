import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = {
                    email: "test@quickscribe.com.tr",
                    password: await bcrypt.hash("12345678", 10) // Hash the password for comparison
                }

                if (!credentials.email || !credentials.password) {
                    throw new Error("Missing credentials.");
                }
                // check validation via bcrypt
                const isValid = await bcrypt.compare(credentials.password, user.password) && credentials.email === user.email;
                if (!isValid) {
                    throw new Error("Invalid credentials.");
                }

                return {
                    id: 1,
                    email: user.email,
                    name: "Quickscribe Test",
                    role: "user"
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }