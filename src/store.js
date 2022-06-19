import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { BackendMiddleware } from "./features/middleware.js";
import {
    accountReducer,
    sessionReducer,
    tripsReducer,
} from "./features/reducers";

const createReducer = () => {
    return combineReducers({
        trips: tripsReducer,
        session: sessionReducer,
        account: accountReducer,
    });
};

const persistConfig = {
    key: "root",
    storage,
};

const reducer = createReducer();
export const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = applyMiddleware(BackendMiddleware);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);
export { store, persistor };
