import React from "react";
import { reservationSelector, tripByIdSelector } from "../../selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./reservation.css";

export const Reservation = (props) => {
    const reservation = useSelector(reservationSelector(props.id));
    const trip = useSelector(tripByIdSelector(reservation.TripId));
    console.log(reservation, trip);

    const beginDate = paseDate(trip.begin_date, true, false);
    const endDate = paseDate(trip.end_date, true, false);
    const createdDate = paseDate(reservation.createdAt);

    return (
        <div className="reservation">
            <div className="main-reservation-info">
                <p className="reservation-trip-data">
                    <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
                    <img src={trip.image} className="obrazek_wycieczk" />
                </p>
                <p>
                    from: {beginDate} to: {endDate}
                </p>
            </div>
            <div className="detail-reservation-info">
                <p>reservation id: {reservation.id}</p>
                <p>number of seats: {reservation.number_of_seats}</p>
                <p>created ad: {createdDate}</p>
            </div>
        </div>
    );
};

const paseDate = (date, days = true, hours = true) => {
    date = new Date(date);

    let result = "";

    if (days) {
        result +=
            date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate();
    }

    if (hours) {
        result +=
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
    }

    return result;
};

Reservation.propTypes = {
    id: PropTypes.number,
};
