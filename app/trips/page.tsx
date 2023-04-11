import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
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

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if(!reservations?.length) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found!"
                    subtitle="Looks like you haven't booked any trip yet"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage