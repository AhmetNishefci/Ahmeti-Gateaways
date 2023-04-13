'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
    currentUser?: SafeUser | null
    reservations: SafeReservation[]
}

const TripsClient = ({
    currentUser,
    reservations
}: TripsClientProps) => {
    const router = useRouter()

    const [deletingId, setDeletingId] = useState<string | null>('')

    // handle delete listing
    const onDeleteTrip = useCallback((reservationId: string) => {
        setDeletingId(reservationId)

        axios.delete(`/api/reservations/${reservationId}`)
            .then(() => {
                toast.success('Trip deleted successfully!')
                router.refresh()
            })
            .catch(() => {
                toast.error('Failed to delete trip!')
            })
            .finally(() => {
                setDeletingId('')
            })
    },[router])
    return (
       <Container>
            <Heading 
                title="Your Trips"
                subtitle="Manage and view your upcoming trips"
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
                {reservations.map((reservation) => (
                    <ListingCard 
                        key={reservation.id}
                        listingData={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onDeleteTrip}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel Reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
       </Container>
    )
}

export default TripsClient