import { combineReducers } from "redux";
import {
    tripsReducer,
    sessionReducer,
    accountReducer,
} from "./features/reducers";

export const createReducer = () => {
    return combineReducers({
        trips: tripsReducer,
        session: sessionReducer,
        account: accountReducer,
    });
};
