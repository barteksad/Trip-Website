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
            </nav>
        </header>
    );
};
