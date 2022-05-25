import React from "react";
import * as ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";
import { createReducer } from "./reducer";

import { createStore } from "redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Main } from "./features/main";


const store = createStore(createReducer());

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
        <Routes>
            <Route path="main" element={<Main/>} />
        </Routes>
        </Router>
    </Provider>
)