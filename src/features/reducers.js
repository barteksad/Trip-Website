export const FetchState = {};

function define(object, name, value) {
    Object.defineProperty(object, name, {
        value: value,
        writable: false,
        enumerable: true,
    });
}

define(FetchState, "UP_TO_DATE", "UP_TO_DATE");
define(FetchState, "FETCHING", "FETCHING");
define(FetchState, "OLDATED", "OLDATED");

Object.freeze(FetchState);

const initialTripsState = {
    fetchState: FetchState.OLDATED,
    data: [],
};

const initialAccountState = {
    fetchState: FetchState.OLDATED,
    data: [],
};

const initialSessionState = {
    loggedIn: false,
};

export const tripsReducer = (state = initialTripsState, action) => {
    switch (action.type) {
        case "TRIPS_FETCH_SUCCESS":
            return {
                fetchState: FetchState.UP_TO_DATE,
                data: action.trips,
            };
        case "TRIPS_FETCH_REQUEST":
            return {
                ...state,
                fetchState: FetchState.FETCHING,
            };
        case "TRIPS_OUTDATE":
            return initialTripsState;
        default:
            return state;
    }
};

export const accountReducer = (state = initialAccountState, action) => {
    switch (action.type) {
        case "ACCOUNT_FETCH_SUCCESS":
            console.log(action);
            return {
                fetchState: FetchState.UP_TO_DATE,
                reservations: action.reservations,
            };
        case "ACCOUNT_FETCH_REQUEST":
            return {
                ...state,
                fetchState: FetchState.FETCHING,
            };
        case "ACCOUNT_OUTDATE":
            return initialAccountState;
        default:
            return state;
    }
};

export const sessionReducer = (state = initialSessionState, action) => {
    switch (action.type) {
        case "SET_SESSION":
            return {
                loggedIn: true,
            };
        case "LOGOUT":
            return {
                loggedIn: false,
            };
        default:
            return state;
    }
};
