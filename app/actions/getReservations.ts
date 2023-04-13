import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

// this function is used to get a list of reservations
export default async function getReservations(params: IParams) {
    try {
        // destructure the params
        const { listingId, userId, authorId } = params;

        let query: any = {};

        // if there is a listingId, add it to the query
        if(listingId) {
            query.listingId = listingId;
        }

        //  if there is a userId, add it to the query
        if(userId) {
            query.userId = userId;
        }

        // if there is an authorId, add it to the query
        if(authorId) {
            query.listing = {
                userId: authorId
            }
        }

        // find the reservations
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // return the reservations
        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            checkInDate: reservation.checkInDate.toISOString(),
            checkOutDate: reservation.checkOutDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            }
        }))

        return safeReservations;
} catch(error: any) {
    throw new Error(error);
}
}