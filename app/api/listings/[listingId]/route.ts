import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

// this function is used to delete a listing
export async function DELETE(
    request: Request,
    { params } : { params: IParams }
){
    // get the current user
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser) return NextResponse.error();

    // get the listing id
    const { listingId } = params;

    // if there is no listing id, return an error
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid listing id");
    }

    // delete the listing
    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id,
        }
    })

    // return the listing
    return NextResponse.json(listing);
}