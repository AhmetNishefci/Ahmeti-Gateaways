'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from 'date-fns'
import Image from 'next/image'
import HeartButton from "../HeartButton"
import Button from "../Button"

interface ListingCardProps {
    listingData: SafeListing
    reservation?: SafeReservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null
}

const ListingCard = ({
    listingData,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}: ListingCardProps) => {
    const router = useRouter()
    const { getCountryByValue } = useCountries()

    const location = getCountryByValue(listingData.locationValue)

    const handleCancel = useCallback((element: React.MouseEvent<HTMLButtonElement>) => {
        element.stopPropagation()
        if(disabled) return

        onAction?.(actionId)
    }, [ disabled, onAction, actionId])

    const listingprice = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice
        }

        return listingData.price
    },[ reservation, listingData.price ])

    const reservationDate = useMemo(() => {
        if(!reservation) return null

        const checkInDate = new Date(reservation.checkInDate)
        const checkOutDate = new Date(reservation.checkOutDate)

        return `${format(checkInDate, 'PP')} - ${format(checkOutDate, 'PP')}`
    },[ reservation])
    
    return (
        <div
            onClick={() => router.push(`/listings/${listingData.id}`)}
            className="
                col-span-1
                cursor-pointer
                group
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image 
                        fill
                        alt={listingData.title}
                        src={listingData.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={listingData.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || listingData.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {listingprice}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            / night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                     />
                   )}
            </div>
        </div>
    )
}

export default ListingCard