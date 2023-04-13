import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
}

// this function is used to get a listing by id
export default async function getListingById({ listingId }: IParams) {
    try{
        // find the listing
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        // if there is no listing, return null
        if(!listing) return null

        // return the listing
        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
              ...listing.user,
              createdAt: listing.user.createdAt.toString(),
              updatedAt: listing.user.updatedAt.toString(),
              emailVerified: 
                listing.user.emailVerified?.toString() || null,
            }
          };
        }catch(error:any){
       throw new Error(error)
    }
}