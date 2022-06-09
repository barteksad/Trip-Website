import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountSelector } from "../selectors";
import { fetchAccount } from "../actions";
import { useEffect } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { Reservation } from "./reservation";

export const Account = () => {
    const accountState = useSelector(accountSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccount());
    }, [dispatch, accountState.fetchState]);

    return (
        <div className="allContent">
            <Header />
            <div className="main">
                {accountState.data.map((trip) => (
                    <Reservation key={trip.id} id={trip.id} />
                ))}
            </div>
            <Footer />
        </div>
    );
};
