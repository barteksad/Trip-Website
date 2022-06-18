import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector } from "../selectors";
import { Header } from "../header";
import { Footer } from "../footer";
import { Reservation } from "./reservation";
import { fetchAccount, fetchTrips } from "../actions";

export const Account = () => {
    const accountState = useSelector(accountSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccount());
        dispatch(fetchTrips());
    });

    return (
        <div className="allContent">
            <Header />
            <div className="main">
                {accountState.data.map((reservation) => (
                    <Reservation key={reservation.id} id={reservation.id} />
                ))}
            </div>
            <Footer />
        </div>
    );
};
