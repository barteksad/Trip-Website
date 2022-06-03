import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { tripByIdSelector } from "../../selectors";

export const TripDescription = (props) => {
    const id = props.id;
    const tripState = useSelector(tripByIdSelector(id));

    return (
        <div className="main">
            <img src={tripState.image} className="obrazek_wycieczk" />
            <div className="info_wycieczki">
                <h2>
                    <Link to={`/trip/${tripState.id}`}>{tripState.name}</Link>
                </h2>
                <p>{tripState.description}</p>
                <div className="div_na_cene_i_rezerwacje">
                    <p>price : {tripState.price}</p>
                    <p>available places : {tripState.available_places}</p>
                    <Link to={`/reserve/${id}`}>reserve {">>"}</Link>
                </div>
            </div>
        </div>
    );
};

TripDescription.propTypes = {
    id: PropTypes.number,
};
