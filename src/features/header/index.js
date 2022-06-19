import React from "react";
import { Link } from "react-router-dom";
import sun from "../../static/sun.png";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "../selectors";
import { outdateAccount, resetSession } from "../actions";
import { backendUrl, logout } from "../../routes";
import { postData } from "../utils";
export const Header = () => {
    const session = useSelector(sessionSelector);
    const dispatch = useDispatch();

    const handleLogout = () => {
        postData(backendUrl + logout)
            .then((response) => {
                if (response.status != 200) {
                    alert("Error while logging out!");
                } else {
                    dispatch(outdateAccount());
                    dispatch(resetSession());
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error connecting to backend!");
            });
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
