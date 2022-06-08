import React from "react";
import { Link } from "react-router-dom";
import sun from "../../static/sun.png";

export const Header = () => {
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
                <menu id="login-signin-menu">
                    <li>
                        {" "}<Link to={"/login"}>login</Link>{" "}
                    </li>
                    <li>
                        {" "}<Link to={"/signin"}>signin</Link>{" "}
                    </li>
                </menu>
            </nav>
        </header>
    );
};
