// import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { Header } from "../header/index.js";
import { Footer } from "../footer/index.js";
import { TripDescription } from "./tripDescription/index.js";
import "../../css/common.css";
import "../../css/main.css";

import { tripsSelector } from "../selectors.js";
import { fetchTrips } from "../actions.js";

export const Main = () => {
    const tripsState = useSelector(tripsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch, tripsState]);

    return (
        <div className="allContent">
            <Header />
            <div className="main">
                {tripsState.trips.map((trip) => (
                    <TripDescription
                        key={trip.name}
                        id={trip.id}
                        name={trip.name}
                        description={trip.description}
                        image={trip.image}
                        price={trip.price}
                        available_places={trip.available_places}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};
