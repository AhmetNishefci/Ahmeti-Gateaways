import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

// this function is used to get the current user's favorite listings
export default async function getFavoriteListings() {
    try {
        // get the current user
        const currentUser = await getCurrentUser();

        //  if there is no user, return an empty array
        if(!currentUser) return [];

        // find the favorite listings
        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        // return the favorite listings
        const safeFavoriteListings = favoriteListings.map(favoriteListing => ({
            ...favoriteListing,
            createdAt: favoriteListing.createdAt.toString(),
        }));

        return safeFavoriteListings;
    } catch(error: any) {
        throw new Error(error);
    }
}