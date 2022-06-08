export const fetchTrips = () => ({
    type: "FETCH_TRIPS",
});

export const setSession = (name, id, last_name, email) => ({
    type: "SET_SESSION",
    id,
    name,
    last_name,
    email,
});

export const resetSession = () => ({
    type: "LOGOUT",
});
