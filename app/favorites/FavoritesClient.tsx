'use client'

import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeListing, SafeUser } from "../types"

interface FavoritesClientProps {
    favoriteListings: SafeListing[]
    currentUser: SafeUser | null
}

const FavoritesClient = ({
    favoriteListings,
    currentUser
}: FavoritesClientProps) => {
    return (
       <Container>
            <Heading 
                title="Your Favorites"
                subtitle="Manage and view your favorite listings"
            />
            <div
                className="
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                "
            >
                {favoriteListings.map((favoriteListing) => (
                    <ListingCard 
                        key={favoriteListing.id}
                        listingData={favoriteListing}
                        currentUser={currentUser} 
                    />
                ))}
            </div>
      </Container> 
    )
}

export default FavoritesClient