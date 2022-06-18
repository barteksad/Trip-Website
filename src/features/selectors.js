export function tripsSelector(state) {
    return state.trips;
}

export function tripByIdSelector(id) {
    return (state) => {
        return state.trips.data.find((trip) => {
            return trip.id == id;
        });
    };
}

export function sessionSelector(state) {
    return state.session;
}

export function accountSelector(state) {
    return state.account;
}

export function reservationSelector(id) {
    return (state) => {
        return state.account.reservations.find((reservation) => {
            return reservation.id == id;
        });
    };
}
