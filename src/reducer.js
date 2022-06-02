import { combineReducers } from "redux";
import { tripsReducer } from "./features/reducers";

export const createReducer = () => {
    return combineReducers({
        trips: tripsReducer,
    });
};
