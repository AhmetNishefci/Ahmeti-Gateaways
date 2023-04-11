'use client'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { SafeReservation, SafeUser } from '@/app/types'
import { useCallback, useState } from 'react'
import Heading from '../components/Heading'
import Container from '../components/Container'
import ListingCard from '../components/listings/ListingCard'

interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const ReservationsClient = ({
    reservations,
    currentUser
}: ReservationsClientProps) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>('')

    const onDeleteReservation = useCallback((reservationId: string) => {
        setDeletingId(reservationId)

        axios.delete(`/api/reservations/${reservationId}`)
            .then(() => {
                toast.success('Reservation deleted successfully!')
                router.refresh()
            })
            .catch(() => {
                toast.error('Failed to delete reservation!')
            })
            .finally(() => {
                setDeletingId('')
            })
    },[router])

    return (
       <Container>
            <Heading
                title="Your Reservations"
                subtitle="Bookings on your properties"
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
                        onAction={onDeleteReservation}
                        disabled={deletingId === reservation.id}
                        actionLabel='Cancel guest reservation'
                        currentUser={currentUser}
                    />
                ))}
            </div>
       </Container>
    )
}

export default ReservationsClient