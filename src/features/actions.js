export const fetchTrips = () => ({
    type: "FETCH_TRIPS",
});

export const outdateTrips = () => ({
    type: "TRIPS_OUTDATE",
});

export const fetchAccount = () => ({
    type: "FETCH_ACCOUNT",
});

export const outdateAccount = () => ({
    type: "ACCOUNT_OUTDATE",
});

export const setSession = (userId) => ({
    type: "SET_SESSION",
    userId,
});

export const resetSession = () => ({
    type: "LOGOUT",
});
