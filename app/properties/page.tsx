import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

const PropertiesPage = async () => {
    // get current user
    const currentUser = await getCurrentUser()

    // check if user is logged in
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You are not logged in!"
                    subtitle="You need to be logged in to view your trips."
                />
            </ClientOnly>
        )
    }

    // get user listings
    const listings = await getListings({
        userId: currentUser.id
    })

    // check if user has any listings
    if(!listings?.length) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found!"
                    subtitle="Looks like you haven't created any property yet"
                />
            </ClientOnly>
        )
    }

    // return properties
    return (
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage