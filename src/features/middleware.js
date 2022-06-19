import { backendUrl, getTrips, getAccount } from "../routes.js";
import { FetchState } from "./reducers";
import { getData } from "./utils.js";
// import { postData, getData } from "./utils.js";

const fetchTripsRequest = () => ({
    type: "TRIPS_FETCH_REQUEST",
});

const fetchTripsSuccess = (trips) => ({
    type: "TRIPS_FETCH_SUCCESS",
    trips,
});

const fetchTripsError = () => ({
    type: "TRIPS_FETCH_ERROR",
});

const fetchAccountRequest = () => ({
    type: "ACCOUNT_FETCH_REQUEST",
});

const fetchAccountSuccess = (reservations) => ({
    type: "ACCOUNT_FETCH_SUCCESS",
    reservations: reservations.reservations,
});

const fetchAccountError = () => ({
    type: "ACCOUNT_FETCH_ERROR",
});

export const BackendMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === "FETCH_TRIPS") {
        if (storeAPI.getState().trips.fetchState === FetchState.OLDATED) {
            storeAPI.dispatch(fetchTripsRequest());
            getData(backendUrl + getTrips)
                .then((response) => response.json())
                .then((data) => storeAPI.dispatch(fetchTripsSuccess(data)))
                .catch((err) => {
                    console.log("Error fetching trips!");
                    console.log(err);
                    storeAPI.dispatch(fetchTripsError());
                });
        }
    }

    if (action.type === "FETCH_ACCOUNT") {
        if (storeAPI.getState().account.fetchState === FetchState.OLDATED) {
            storeAPI.dispatch(fetchAccountRequest());
            getData(backendUrl + getAccount)
                .then((response) => response.json())
                .then((data) => storeAPI.dispatch(fetchAccountSuccess(data)))
                .catch((err) => {
                    console.log("Error fetching account!");
                    console.log(err);
                    storeAPI.dispatch(fetchAccountError());
                });
        }
    }

    return next(action);
};
