import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tripByIdSelector } from "../selectors";
import { Header } from "../header";
import { Footer } from "../footer";
import axios from "axios";
import { backendUrl, reserve } from "../../routes";
import { useNavigate } from "react-router-dom";
import { outdateTrips, outdateAccount } from "../actions";
axios.defaults.withCredentials = true;
export const Reserve = () => {
    const { id } = useParams();
    const [count, setCount] = useState(1);
    const tripState = useSelector(tripByIdSelector(parseInt(id)));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkCount = () => {
        const count_input = document.getElementById("count-input");
        const count_input_error = document.getElementById("count-input-error");

        const num = Number(count);
        if (!(Number.isInteger(num) && num > 0)) {
            count_input.classList.add("invalid-form");
            count_input_error.textContent = "provide correct number";
            return false;
        } else {
            count_input.classList.remove("invalid-form");
            count_input_error.textContent = "";
            return true;
        }
    };

    useEffect(() => {
        checkCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkCount()) {
            event.stopPropagation();
            return;
        }

        axios
            .post(
                backendUrl + reserve,
                {
                    count: count,
                    tripId: parseInt(id),
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
                    if (res.data.error == null) {
                        dispatch(outdateAccount());
                        dispatch(outdateTrips());
                        navigate("/account");
                    } else {
                        alert(res.data.error);
                    }
                } else {
                    alert(res.data.error);
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.data);
                alert("Error connectiong to backend!");
            });
    };

    return (
        <div className="main">
            <Header />
            <img src={tripState.image} className="obrazek_wycieczk" />
            <div className="info_wycieczki">
                <h2>
                    <Link to={`/trip/${tripState.id}`}>{tripState.name}</Link>
                </h2>
                <p>{tripState.description}</p>
                <div className="div_na_cene_i_rezerwacje">
                    <p>price : {tripState.price}</p>
                    <p>available places : {tripState.available_places}</p>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="count">count</label>
                    <div>
                        <input
                            id="count-input"
                            type="text"
                            name="count"
                            value={count}
                            onChange={(event) => setCount(event.target.value)}
                        ></input>
                        <span id="count-input-error"></span>
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
