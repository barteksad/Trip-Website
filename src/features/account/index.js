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
        console.log("HDHDHDDH\n\n");
        dispatch(fetchAccount());
    }, [dispatch, accountState.fetchState]);
    console.log(accountState);
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
