import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

// this function is used to delete a reservation
export async function DELETE(request: Request,{ params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    // if there is no user, return an error
    if(!currentUser){
        return NextResponse.error()
    }

    // get the reservation id
    const { reservationId } = params;

    // if there is no reservation id, return an error
    if(!reservationId || typeof reservationId !== "string"){
        throw new Error("Invalid ID");
    }

    // delete the reservation
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    listing: {
                        userId: currentUser.id
                    }          
                },
                {
                    userId: currentUser.id
                }
            ]
        }
    })
    
    // return the reservation
    return NextResponse.json(reservation);
}