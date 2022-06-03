import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../header/index.js";
import { Footer } from "../footer/index.js";

import { fetchTrips } from "../actions.js";
import { tripsSelector, tripByIdSelector } from "../selectors";

export const TripPage = () => {
    const { id } = useParams();
    const tripsState = useSelector(tripsSelector);
    const tripState = useSelector(tripByIdSelector(id));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrips());
    }, [dispatch, tripsState.fetchState]);

    return (
        <div className="allContent">
            <Header />
            <div className="main">
                <img src={tripState.image} className="obrazek_wycieczk" />
                <div className="info_wycieczki">
                    <h2> {tripState.name}</h2>
                    <p>{tripState.description}</p>
                    <div className="div_na_cene_i_rezerwacje">
                        <p>price : {tripState.price}</p>
                        <p>available places : {tripState.available_places}</p>
                        <Link to={`/reserve/${id}`}>reserve {">>"}</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
