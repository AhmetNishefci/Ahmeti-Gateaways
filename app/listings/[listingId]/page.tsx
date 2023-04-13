import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"

interface IParams {
    listingId?: string
}

const ListingPage = async ({
    params
}: { params: IParams}) => {
    const listingById = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    // check if listing exists
    if(!listingById) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    // return listing
    return (
       <ClientOnly>
            <ListingClient 
                listingById={listingById}
                reservations={reservations}
                currentUser={currentUser}
            />
       </ClientOnly>
    )
}

export default ListingPage