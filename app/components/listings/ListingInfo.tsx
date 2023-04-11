'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { useMemo } from "react"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../Map"), { ssr: false })

interface ListingInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    roomCount: number
    bathroomCount: number
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    locationValue: string 
}

const ListingInfo = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}: ListingInfoProps) => {
    const { getCountryByValue } = useCountries()

    const countryCoordinates = useMemo(() => {
        return getCountryByValue(locationValue)?.latlng
    },[ locationValue, getCountryByValue])

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    "
                >
                    <div>Hosted by {user?.name}</div>
                    <Avatar 
                        src={user?.image}
                    />
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        {guestCount > 1 ? `${guestCount} guests` : `${guestCount} guest`}
                    </div>
                    <div>
                        {roomCount > 1 ? `${roomCount} bedrooms` : `${roomCount} bedroom`}
                    </div>
                    <div>
                        {bathroomCount > 1 ? `${bathroomCount} bathrooms` : `${bathroomCount} bathroom`}
                    </div>
                </div>
            </div>
            <hr/>
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr/>
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr/>
            <Map center={countryCoordinates}/>
        </div>
    )
}

export default ListingInfo