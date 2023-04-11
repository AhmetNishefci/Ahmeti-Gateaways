import  EmptyState  from  "../components/EmptyState";
import  ClientOnly  from  "../components/ClientOnly";

import getCurrentUser  from  "../actions/getCurrentUser";
import getFavoriteListings  from  "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage  =  async  () => {
    const currentUser  =  await  getCurrentUser();
    const favoriteListings  =  await  getFavoriteListings()

    if (!favoriteListings?.length) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No favorites found!"
                    subtitle="Looks like you haven't added any favorite yet"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient 
                favoriteListings={favoriteListings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export  default  FavoritesPage