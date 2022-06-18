import React, { useState } from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import axios from "axios";
import { backendUrl, login } from "../../routes";
import { useDispatch } from "react-redux";
import { setSession } from "../actions";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSumbit = async (event) => {
        event.preventDefault();

        axios
            .post(
                backendUrl + login,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.loggedIn == false) {
                        alert(res.data.error);
                    } else {
                        dispatch(setSession());
                        navigate("/main");
                    }
                } else {
                    alert("Error connectiong to backend");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error connectiong to backend");
            });
    };

    return (
        <div className="allContent">
            <Header />
            <div className="form-div">
                <strong>Sign in</strong>
                <form id="log-in-form" onSubmit={handleSumbit}>
                    <label htmlFor="email">Email</label>
                    <div>
                        <input
                            id="email-input"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        ></input>
                        <span id="email-input-error"></span>
                    </div>

                    <label htmlFor="password">Password</label>
                    <div>
                        <input
                            id="password-input"
                            type="text"
                            name="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        ></input>
                        <span id="password-input-error"></span>
                    </div>

                    <button type="submit" value="submit">
                        submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};
