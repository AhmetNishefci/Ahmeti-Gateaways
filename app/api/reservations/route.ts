import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const body = await request.json();
    
    const { 
        listingId,
        checkInDate,
        checkOutDate,
        totalPrice,
    } = body;

    if(!listingId || !checkInDate || !checkOutDate || !totalPrice) return NextResponse.error();

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
    
    return NextResponse.json(listingAndReservations);
}