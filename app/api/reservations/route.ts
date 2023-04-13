import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

// this function is used to create a reservation
export async function POST(request: Request){
    // get the current user
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser) return NextResponse.error();

    // get the body
    const body = await request.json();
    
    // get the reservation data
    const { 
        listingId,
        checkInDate,
        checkOutDate,
        totalPrice,
    } = body;

    // if there is no listing id, check in date, check out date, or total price, return an error
    if(!listingId || !checkInDate || !checkOutDate || !totalPrice) return NextResponse.error();

    // create the reservation
    const listingAndReservations = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    checkInDate,
                    checkOutDate,
                    totalPrice,
                }
            }
        },
    })
    
    // return the reservation
    return NextResponse.json(listingAndReservations);
}