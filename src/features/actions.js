export const fetchTrips = () => ({
    type: "FETCH_TRIPS",
});

export const fetchAccount = () => ({
    type: "FETCH_ACCOUNT",
});

export const setSession = (userId) => ({
    type: "SET_SESSION",
    userId,
});

export const resetSession = () => ({
    type: "LOGOUT",
});
