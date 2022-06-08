import { combineReducers } from "redux";
import { tripsReducer, sessionReducer } from "./features/reducers";

export const createReducer = () => {
    return combineReducers({
        trips: tripsReducer,
        session: sessionReducer,
    });
};
