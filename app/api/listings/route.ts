import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

// this function is used to create a listing
export async function POST(request: Request){
    // get the current user
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser){
        return NextResponse.error()
    }

    // get the body
    const body = await request.json();

    // get the listing data
    const {
        title,
        description,
        price,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
    } = body;

    // create the listing
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        }
    })

    // return the listing
    return NextResponse.json(listing);
}