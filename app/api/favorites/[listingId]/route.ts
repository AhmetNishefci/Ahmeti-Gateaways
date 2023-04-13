import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

// this function is used to add a listing to the favorites
export async function POST(request: Request,{ params }: { params: IParams }) {
    // get the current user
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser){
        return NextResponse.error()
    }

    // get the listing id
    const { listingId } = params;

    // if there is no listing id, return an error
    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }

    // get the favorite ids
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // add the listing id to the favorite ids
    favoriteIds.push(listingId);

    // update the user
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    // return the user
    return NextResponse.json(user);
}

// this function is used to remove a listing from the favorites
export async function DELETE(request: Request,{ params }: { params: IParams }) {
    // get the current user
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser){
        return NextResponse.error()
    }

    // get the listing id
    const { listingId } = params;

    // if there is no listing id, return an error
    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }

    // get the favorite ids
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // remove the listing id from the favorite ids
    favoriteIds = favoriteIds.filter(id => id !== listingId);

    // update the user
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    // return the user
    return NextResponse.json(user);
}