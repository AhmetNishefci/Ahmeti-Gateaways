'use client'

import axios from "axios"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import { categories } from "@/app/components/navbar/Categories"
import Container from "@/app/components/Container"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { Range } from "react-date-range";
import { useBoolean } from "usehooks-ts"
import toast from "react-hot-toast"
import ListingReservation from "@/app/components/listings/ListingReservation"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[] | null
    listingById: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient = ({
    reservations,
    listingById,
    currentUser
}:ListingClientProps) => {
    const { id, title, imageSrc, locationValue, user, category, description, roomCount, guestCount, bathroomCount, price } = listingById

    const {openLoginModal} = useLoginModal()
    const router = useRouter()

    // get all dates that are booked
    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.checkInDate),
                end: new Date(reservation.checkOutDate)
            })

            dates = [...dates, ...range]
         })
            return dates
    },[reservations])

    const {value:isLoading, setTrue:setLoadingTrue, setFalse:setLoadingFalse} = useBoolean(false)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [totalPrice, setTotalPrice] = useState(price)

    // this function handled reservation creation
   const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            openLoginModal()
            return
        }
        setLoadingTrue()

        axios.post('/api/reservations', {
            totalPrice,
            checkInDate: dateRange.startDate,
            checkOutDate: dateRange.endDate,
            listingId: id,
        })
        .then(() => {
            toast.success('Reservation created successfully')
            setDateRange(initialDateRange)
            router.push('/trips')
        })
        .catch(() => {
            toast.error('Something went wrong')
        })
        .finally(() => {
            setLoadingFalse()
        })
   },[  currentUser,
        dateRange,
        id,
        openLoginModal,
        router,
        totalPrice,
        setLoadingFalse,
        setLoadingTrue ])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const bookedDaysCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

        if(bookedDaysCount && price) {
            setTotalPrice(bookedDaysCount * price)
        } else {
            setTotalPrice(price)
            }
        }
    },[ dateRange, price])

    // get category by id
    const categoryById = useMemo(() => {
        return categories.find((item) => item.label === category)
    },[ category])

    return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead 
                    title={title}
                    imageSrc={imageSrc}
                    locationValue={locationValue}
                    id={id}
                    currentUser={currentUser}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <ListingInfo 
                        user={user}
                        category={categoryById}
                        description={description}
                        roomCount={roomCount}
                        guestCount={guestCount}
                        bathroomCount={bathroomCount}
                        locationValue={locationValue}
                    />
                    <div
                        className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        ">
                            <ListingReservation 
                                price={price}
                                totalPrice={totalPrice}
                                onChangeDateRange={(range) => setDateRange(range)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                    </div>
                </div>
            </div>
        </div>
    </Container>
    )
}

export default ListingClient