import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

// this function is used to get the current user from the database
export default async function getCurrentUser() {
   try{
    // get the current session
    const session = await getSession();

    // if there is no session, return null
    if (!session?.user?.email) {
        return null;
    }

    // find the user in the database
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    // if there is no user, return null
    if(!currentUser){
        return null;
    }

    //  return the user
    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
    }

    } catch (error: any) {
    return null
    }
}
