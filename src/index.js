import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./features/main";
import { TripPage } from "./features/trip";
import { Login } from "./features/login";
import { SignIn } from "./features/signin";
import { Reserve } from "./features/reserve";
import { Account } from "./features/account";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Routes>
                    <Route path="/main" element={<Main />} />
                    <Route path="/trip/:id" element={<TripPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/reserve/:id" element={<Reserve />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </Router>
        </PersistGate>
    </Provider>
);
