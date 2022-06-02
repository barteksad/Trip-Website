import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <h2>Biuro podróży, 2022</h2>
            <nav>
                <menu>
                    <li>
                        {" "}
                        <Link to={"/main"}> O firmie </Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/main"}> Polityka prywatności </Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/main"}> Kontakt </Link>{" "}
                    </li>
                </menu>
            </nav>
        </footer>
    );
};
