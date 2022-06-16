// import React from "react";
import { reservationSelector } from "../../selectors";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const Reservation = (props) => {
    const reservation = useSelector(reservationSelector(props.id));
    console.log(reservation);
};

Reservation.propTypes = {
    id: PropTypes.number,
};
