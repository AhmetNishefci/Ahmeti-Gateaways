import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
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

    //  get user reservations
    const reservations = await getReservations({
        userId: currentUser.id
    })

    // check if user has any reservations
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

    // return reservations
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