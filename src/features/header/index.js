import React from "react";
import { Link } from "react-router-dom";
import sun from "../../static/sun.png";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "../selectors";
import { resetSession } from "../actions";

export const Header = () => {
    const session = useSelector(sessionSelector);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetSession());
    }

    return (
        <header>
            <img src={sun} alt="" className="obrazek_logo"></img>
            <nav>
                <menu>
                    <li>
                        {" "}
                        <Link to={"/main"}> wycieczki lotnicze </Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/main"}> wycieczki samochodowe </Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/main"}> wycieczki piesze </Link>{" "}
                    </li>
                </menu>
                {session ? (
                    <menu id="logout">
                        <button onClick={handleLogout}>logout</button>
                    </menu>
                ) : (
                    <menu id="login-signin-menu">
                        <li>
                            {" "}
                            <Link to={"/login"}>login</Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to={"/signin"}>signin</Link>{" "}
                        </li>
                    </menu>
                )}
            </nav>
        </header>
    );
};
