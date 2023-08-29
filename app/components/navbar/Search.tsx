'use client'

import useCountries from '@/app/hooks/useCountries'
import useSearchModal from '@/app/hooks/useSearchModal'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
    const {openSearchModal } = useSearchModal()
    const params = useSearchParams()
    const { getCountryByValue } = useCountries()

    const locationValue = params?.get('locationValue')
    const checkInDate = params?.get('checkInDate')
    const checkOutDate = params?.get('checkOutDate')
    const guestCount = params?.get('guestCount')

    // get location label
    const locationLabel = useMemo(() => {
        if (locationValue) {
            const country = getCountryByValue(locationValue as string)
            return country?.label
        }
        return 'Anywhere'
    },[ locationValue, getCountryByValue ])

    // get duration label
    const durationLabel = useMemo(() => {
        if (checkInDate && checkOutDate) {
            const checkIn = new Date(checkInDate as string)
            const checkOut = new Date(checkOutDate as string)
            const duration = differenceInDays(checkOut, checkIn)
            if(duration === 0) return '1 day stay'
            return `${duration} ${duration > 1 ? 'nights' : 'night'}`
        }
        return 'Any Week'
    },[ checkInDate, checkOutDate])

    // get guest label
    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} ${+guestCount > 1 ? 'guests' : 'guest'}`
        }
        return 'Add Guests'
    },[ guestCount])

    return (
        <div 
            onClick={openSearchModal}
            className="
                border-[1px] 
                w-full 
                md:w-auto 
                py-2 
                rounded-full 
                shadow-sm 
                hover:shadow:md 
                transition 
                cursor-pointer">
            <div 
                className="
                    flex 
                    flex-row 
                    items-center 
                    justify-between">
                <div className="text-sm font-semibold px-8">
                    {locationLabel}
                </div>
                <div className="
                    hidden 
                    sm:block 
                    text-sm 
                    font-semibold 
                    px-6 
                    border-x-[1px] 
                    flex-1 
                    text-center">
                    {durationLabel}
                </div>
                <div className="
                    text-sm 
                    pl-6 
                    pr-2 
                    text-gray-600 
                    flex 
                    flex-row 
                    items-center 
                    gap-3">
                    <div className="hidden sm:block">{guestLabel}</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18}/>
                    </div>           
                </div>
            </div>
        </div>
          
    )
}

export default Search

