// import React from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/common.css";
import "../../css/main.css";
import { Footer } from "../footer/index.js";
import { Header } from "../header/index.js";
import { TripDescription } from "../trip/tripDescription/index.js";

import { fetchTrips } from "../actions.js";
import { tripsSelector } from "../selectors.js";

export const Main = () => {
    const tripsState = useSelector(tripsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch, tripsState.fetchState]);

    return (
        <div className="allContent">
            <Header />
            <div className="main">
                {tripsState.data.map((trip) => (
                    <TripDescription key={trip.id} id={trip.id} />
                ))}
            </div>
            <Footer />
        </div>
    );
};
