import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../header/index.js";
import { Footer } from "../footer/index.js";
import { TripDescription } from "./tripDescription/index.js";

import { fetchTrips } from "../actions.js";
import { tripsSelector } from "../selectors";

export const TripPage = () => {
    const { id } = useParams();
    const tripsState = useSelector(tripsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch, tripsState.fetchState]);

    return (
        <div className="allContent">
            <Header />
            <TripDescription id={parseInt(id)} />
            <Footer />
        </div>
    );
};
