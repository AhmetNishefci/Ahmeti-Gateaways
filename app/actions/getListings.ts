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

// this function is used to get a list of listings
export default async function getListings(
    params: IListingParams
) {
    try{
        // destructure the params
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

        // if there is a userId, add it to the query
        if(userId) {
            query.userId = userId
        }
        // if there is a category, add it to the query
        if(category) {
            query.category = category
        }
        //  if there is a guestCount, add it to the query
        if(roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }
        // if there is a bathroomCount, add it to the query
        if(bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }
        // if there is a guestCount, add it to the query
        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }
        // if there is a locationValue, add it to the query
        if(locationValue) {
            query.locationValue = locationValue
        }
        // if there is a checkInDate and a checkOutDate, add it to the query
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

        // find the listings
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        // return the listings
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