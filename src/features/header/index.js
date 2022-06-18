import React from "react";
import { Link } from "react-router-dom";
import sun from "../../static/sun.png";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "../selectors";
import { resetSession } from "../actions";
import axios from "axios";
import { backendUrl, logout } from "../../routes";
export const Header = () => {
    const session = useSelector(sessionSelector);
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.post(backendUrl + logout);
        dispatch(resetSession());
    };

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
                {session.loggedIn == true ? (
                    <menu id="user-menu">
                        <li>
                            {" "}
                            <Link to={"/main"} onClick={handleLogout}>
                                logout
                            </Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to={"/account"}>my account</Link>{" "}
                        </li>
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
