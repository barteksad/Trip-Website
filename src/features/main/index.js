// import React from "react";
import { useSelector, useDispatch  } from "react-redux";
// import { useNavigate } from "react-router-dom";
import React from 'react';

import { tripsSelector } from "../selectors.js";
import { setFetchedTrips } from "../actions.js";

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
import { backendUrl, getTrips } from "../../routes.js";

export const Main = () => {
    const tripsState = useSelector(tripsSelector);
    const dispatch = useDispatch();
    const fetchTrips = async (dispatch, tripsState, setFetchedTrips) => {
        if (tripsState.trips_fetched) {
            return;
        } 
        axios
            .get(backendUrl + getTrips)
            .then((res) => {
                dispatch(setFetchedTrips(res.data));
            })
            .catch((err)=> {
                console.log(err);
            });
    }

    fetchTrips(dispatch, tripsState, setFetchedTrips);

    return(
        <div className="main">
            {tripsState.trips_fetched && tripsState.trips.map(trip => {
                const {id, name, description, short_description, image, price, begin_date, end_date, available_places, createdAt, updatedAt} = trip;
                return <li key={id}>{name},{ description},{ short_description},{ image},{ price},{ begin_date},{ end_date},{ available_places},{ createdAt},{ updatedAt}</li>
            })}
        </div>
    )
}