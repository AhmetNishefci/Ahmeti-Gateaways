import prisma from '@/app/libs/prismadb'

export interface IListingParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    checkInDate?: string
    checkOutDate?: string
    locationValue?: string
    category?: string
}

export default async function getListings(
    params: IListingParams
) {
    try{
        const { 
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            checkInDate,
            checkOutDate,
            locationValue,
            category
         } = params

        let query: any = {}

        if(userId) {
            query.userId = userId
        }
        if(category) {
            query.category = category
        }
        if(roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        if(bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(locationValue) {
            query.locationValue = locationValue
        }
        if(checkInDate && checkOutDate) {
           query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                checkOutDate: {
                                    gte: checkInDate
                                },
                                checkInDate: {
                                    lte: checkInDate
                                }
                            },
                            {
                                checkInDate: {
                                    lte: checkOutDate
                                },
                                checkOutDate: {
                                    gte: checkOutDate
                                }
                            }
                        ]
                    }
                }
           }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        const safeListings = listings.map(listing => {
            return {
                ...listing,
                createdAt: listing.createdAt.toISOString(),
            }
        })
        return safeListings
    }catch(error:any){
       throw new Error(error)
    }
}