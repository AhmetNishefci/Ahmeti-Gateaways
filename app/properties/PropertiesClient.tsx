'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
    currentUser: SafeUser | null
    listings: SafeListing[]
}

const TripsClient = ({
    currentUser,
    listings
}: TripsClientProps) => {
    const router = useRouter()

    const [deletingId, setDeletingId] = useState<string | null>('')

    // handle delete listing
    const onDeleteProperty = useCallback((reservationId: string) => {
        setDeletingId(reservationId)

        axios.delete(`/api/listings/${reservationId}`)
            .then(() => {
                toast.success('Listing deleted successfully!')
                router.refresh()
            })
            .catch(() => {
                toast.error('Failed to delete listing!')
            })
            .finally(() => {
                setDeletingId('')
            })
    },[router])
    return (
       <Container>
            <Heading 
                title="Your Properties"
                subtitle="Manage and view your properties"
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
                {listings.map((listing) => (
                    <ListingCard 
                        key={listing.id}
                        listingData={listing}
                        actionId={listing.id}
                        onAction={onDeleteProperty}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
       </Container>
    )
}

export default TripsClient