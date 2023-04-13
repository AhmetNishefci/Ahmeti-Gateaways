import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";
import TripsClient from "../trips/TripsClient";

const ReservationsPage = async () => {
    // get current user
    const currentUser = await getCurrentUser();

    // check if user is logged in
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You are not logged in!"
                    subtitle="You need to be logged in to view your reservations."
            />
            </ClientOnly>
        );
    }

    // get user reservations
    const reservations = await getReservations({
        authorId: currentUser.id
    })

    // check if user has any reservations
    if (!reservations?.length) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found!"
                    subtitle="Looks like you don't have any reservation on your properties"
                />
            </ClientOnly>
        );
    }

    // return reservations
    return (
        <ClientOnly>
            <ReservationsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage