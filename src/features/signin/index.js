import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { backendUrl, signin } from "../../routes";
import { outdateAccount, setSession } from "../actions";
import { Footer } from "../footer";
import { Header } from "../header";
import { loggedInSelector } from "../selectors";
import { postData } from "../utils";
import "./signin.css";

export const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInState = useSelector(loggedInSelector);
    console.log("login state = " + loggedInState);

    useEffect(() => {
        if (loggedInState) {
            navigate("/account");
        }
    }, [loggedInState, navigate]);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkName = () => {
        const len = name.length;
        const name_input = document.getElementById("name-input");
        const name_input_error = document.getElementById("name-input-error");
        if (len === 0 || len > 40) {
            name_input.classList.add("invalid-form");
            name_input_error.textContent =
                "name must be between 1 and 40 characters!";
            return false;
        } else {
            name_input.classList.remove("invalid-form");
            name_input_error.textContent = "";
            return true;
        }
    };

    const checkLastName = () => {
        const len = lastName.length;
        const last_name_input = document.getElementById("last-name-input");
        const last_name_input_error = document.getElementById(
            "last-name-input-error"
        );
        if (len === 0 || len > 40) {
            last_name_input.classList.add("invalid-form");
            last_name_input_error.textContent =
                "email must be between 1 and 40 characters!";
            return false;
        } else {
            last_name_input.classList.remove("invalid-form");
            last_name_input_error.textContent = "";
            return true;
        }
    };

    const checkEmail = () => {
        const len = email.length;
        const email_input = document.getElementById("email-input");
        const email_input_error = document.getElementById("email-input-error");

        if (len === 0 || len > 40) {
            email_input.classList.add("invalid-form");
            email_input_error.textContent =
                "email must be between 1 and 40 characters!";
            return false;
        } else {
            email_input.classList.remove("invalid-form");
            email_input_error.textContent = "";
            return true;
        }
    };

    const checkPassword = () => {
        const len = password.length;
        const password_input = document.getElementById("password-input");
        const password_input_error = document.getElementById(
            "password-input-error"
        );
        const confirm_password_input_error = document.getElementById(
            "confirm-password-input-error"
        );
        const passwordsSame = password == confirmPassword;

        if (len === 0 || len > 40) {
            password_input.classList.add("invalid-form");
            password_input_error.textContent =
                "password must be between 1 and 40 characters!";
        } else {
            password_input.classList.remove("invalid-form");
            password_input_error.textContent = "";
        }

        if (!passwordsSame) {
            confirm_password_input_error.classList.add("invalid-form");
            confirm_password_input_error.textContent =
                "passwords must be the same!";
        } else {
            confirm_password_input_error.classList.remove("invalid-form");
            confirm_password_input_error.textContent = "";
        }

        if (len === 0 || len > 40 || !passwordsSame) {
            return false;
        } else {
            return true;
        }
    };

    const checkaAll = () => {
        const nameOk = checkName();
        const lastNameOk = checkLastName();
        const emailOk = checkEmail();
        const passwordOk = checkPassword();
        const allOk = nameOk && lastNameOk && emailOk && passwordOk;

        return allOk;
    };

    useEffect(() => {
        checkName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    useEffect(() => {
        checkLastName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastName]);

    useEffect(() => {
        checkEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    useEffect(() => {
        checkPassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword]);

    const handleSumbit = async (event) => {
        event.preventDefault();

        if (!checkaAll()) {
            event.stopPropagation();
            return;
        }

        const signInData = {
            name: name,
            last_name: lastName,
            email: email,
            password: password,
        };

        postData(backendUrl + signin, signInData)
            .then((response) => response.json())
            .then((data) => {
                if (data.error != null) {
                    alert(data.error);
                    return;
                }
                dispatch(setSession());
                dispatch(outdateAccount());
                navigate("/main");
            })
            .catch((err) => {
                console.log(err);
                alert("Error connectiong to backend!");
            });
    };

    return (
        <div className="allContent">
            <Header />
            <div className="form-div">
                <strong>Sign in</strong>
                <form id="sign-in-form" onSubmit={handleSumbit}>
                    <label htmlFor="name">Name</label>
                    <div>
                        <input
                            id="name-input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        ></input>
                        <span id="name-input-error"></span>
                    </div>

                    <label htmlFor="last-name">Last name</label>
                    <div>
                        <input
                            id="last-name-input"
                            type="text"
                            name="last-name"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        ></input>
                        <span id="last-name-input-error"></span>
                    </div>

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

                    <label htmlFor="confirm-password">Confirm password</label>
                    <div>
                        <input
                            id="confirm-password-input"
                            type="text"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                        ></input>
                        <span id="confirm-password-input-error"></span>
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
