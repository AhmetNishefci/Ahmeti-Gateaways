import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

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

    const listings = await getListings({
        userId: currentUser.id
    })

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