import axios from "axios";
import { backendUrl, getTrips } from "../routes.js";
import { TripsState } from "./reducers"

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const fetchTripsRequest = () => ({
    type : "FETCH_REQUEST",
});

const fetchTripsSuccess = (trips) => ({
    type : "FETCH_SUCCESS",
    trips,
});

const fetchTripsError = () => ({
    type : "FETCH_ERROR",
});

export const BackendMiddleware = storeAPI => next => action => {
    if (action.type === 'FETCH_TRIPS') {
        if(storeAPI.getState().trips.tripsState === TripsState.OLDATED) {
            storeAPI.dispatch(fetchTripsRequest());
            axios.get(backendUrl + getTrips)
            .then((res) => {
                storeAPI.dispatch(fetchTripsSuccess(res.data));
            })
            .catch((err) => {
                console.log(err);
                storeAPI.dispatch(fetchTripsError());
            })
        }
    }
  
    return next(action)
  }