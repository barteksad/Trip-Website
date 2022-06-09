// import axios from "axios";
import { backendUrl, getTrips, getAccount } from "../routes.js";
import { AccountState, TripsState } from "./reducers";
// import { postData } from "./utils.js";
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

            const request = new Request(backendUrl + getTrips, {
                method: "GET",
                mode: "cors",
                cache: "default",
                credentials: "include",
            });

            try {
                fetch(request)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        storeAPI.dispatch(fetchTripsSuccess(data));
                    });
            } catch {
                storeAPI.dispatch(fetchTripsError());
            }
        }
    }
    if (action.type === "FETCH_ACCOUNT") {
        if (storeAPI.getState().account.fetchState === AccountState.OLDATED) {
            storeAPI.dispatch(fetchTripsRequest());

            const request = new Request(backendUrl + getAccount, {
                method: "GET",
                mode: "cors",
                cache: "default",
                credentials: "include",
            });

            try {
                fetch(request)
                    .then((response) => {
                        console.log(response);
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        storeAPI.dispatch(fetchAccountSuccess(data));
                    });
            } catch {
                storeAPI.dispatch(fetchAccountError());
            }
        }
    }

    return next(action);
};
