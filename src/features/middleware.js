import axios from "axios";
import { backendUrl, getTrips, getAccount } from "../routes.js";
import { FetchState } from "./reducers";

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
    reservations,
});

const fetchAccountError = () => ({
    type: "ACCOUNT_FETCH_ERROR",
});


export const BackendMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === "FETCH_TRIPS") {
        if (storeAPI.getState().trips.fetchState === FetchState.OLDATED) {
            storeAPI.dispatch(fetchTripsRequest());
            axios
                .get(backendUrl + getTrips, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    storeAPI.dispatch(fetchTripsSuccess(res.data));
                })
                .catch((err) => {
                    console.log(err);
                    storeAPI.dispatch(fetchTripsError());
                });
        }
    }

    if (action.type === "FETCH_ACCOUNT") {
        if (storeAPI.getState().account.fetchState === FetchState.OLDATED) {
            storeAPI.dispatch(fetchAccountRequest());
            axios
                .get(backendUrl + getAccount, 
                    {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log(res.data);
                    storeAPI.dispatch(fetchAccountSuccess(res.data.reservations));
                })
                .catch((err) => {
                    console.log(err);
                    storeAPI.dispatch(fetchAccountError());
                });
        }
    }

    return next(action);
};
