import axios from "axios";
import { backendUrl, getTrips, getAccount } from "../routes.js";
import { AccountState, TripsState } from "./reducers";
axios.defaults.withCredentials = true;
const fetchTripsRequest = () => ({
    type: "FETCH_REQUEST",
});

const fetchTripsSuccess = (trips) => ({
    type: "FETCH_SUCCESS",
    trips,
});

const fetchTripsError = () => ({
    type: "FETCH_ERROR",
});

const fetchAccountSuccess = (trips) => ({
    type: "FETCH_SUCCESS",
    trips,
});

const fetchAccountError = () => ({
    type: "FETCH_ERROR",
});

export const BackendMiddleware = (storeAPI) => (next) => (action) => {
    if (action.type === "FETCH_TRIPS") {
        if (storeAPI.getState().trips.fetchState === TripsState.OLDATED) {
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
        if (storeAPI.getState().account.fetchState === AccountState.OLDATED) {
            storeAPI.dispatch(fetchTripsRequest());
            axios
                .get(backendUrl + getAccount, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((res) => {
                    storeAPI.dispatch(fetchAccountSuccess(res.data));
                })
                .catch((err) => {
                    console.log(err);
                    storeAPI.dispatch(fetchAccountError());
                });
        }
    }

    return next(action);
};
