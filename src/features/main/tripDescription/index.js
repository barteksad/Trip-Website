import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const TripDescription = (props) => {
    return (
        <div id={props.name}>
            <img src={props.image} alt="" className="obrazek_wycieczk" />
            <div className="info_wycieczki">
                <h2>
                    {" "}
                    <Link to={`/trip/${props.id}`}> {props.name} </Link>{" "}
                </h2>
                <p>{props.description}</p>
                <div className="div_na_cene_i_rezerwacje">
                    <p>price: {props.price}</p>
                    <p>available places: {props.available_places}</p>
                    <Link to={`/reserve/${props.id}`}> Zarezerwuj {">>"} </Link>
                </div>
            </div>
        </div>
    );
};

TripDescription.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    available_places: PropTypes.number,
    price: PropTypes.number,
};
