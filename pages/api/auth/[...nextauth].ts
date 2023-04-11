import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/app//libs/prismadb";

import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                //Check if credentials are valid
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials")
                }
                
                //Fetch user
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                
                //Check if user exists
                if(!user || !user.hashedPassword){
                    throw new Error("Invalid credentials")
                }

                //Check if password is valid
                const isCorrectPassword  = await bcrypt.compare(credentials.password, user.hashedPassword)

                //Throw error if password is invalid
                if(!isCorrectPassword){
                    throw new Error("Invalid credentials")
                }

                return user
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    debug:  process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)