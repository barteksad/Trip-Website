import React from "react";
import * as ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { createReducer } from "./reducer";

import { createStore, applyMiddleware } from "redux";
import { BackendMiddleware } from "./features/middleware.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Main } from "./features/main";
import { TripPage } from "./features/trip";
import { Login } from "./features/login";
import { SignIn } from "./features/signin";
import { Reserve } from "./features/reserve";

import axios from "axios";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

const middleware = applyMiddleware(BackendMiddleware);
const store = createStore(createReducer(), middleware);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/trip/:id" element={<TripPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/reserve/:id" element={<Reserve />} />
                <Route path="/account" element={<Reserve />} />
            </Routes>
        </Router>
    </Provider>
);
