export const TripsState = {};
export const AccountState = {};

function define(object, name, value) {
    Object.defineProperty(object, name, {
        value: value,
        writable: false,
        enumerable: true,
    });
}

define(TripsState, "UP_TO_DATE", "UP_TO_DATE");
define(TripsState, "FETCHING", "FETCHING");
define(TripsState, "OLDATED", "OLDATED");

define(AccountState, "UP_TO_DATE", "UP_TO_DATE");
define(AccountState, "FETCHING", "FETCHING");
define(AccountState, "OLDATED", "OLDATED");

Object.freeze(TripsState);
Object.freeze(AccountState);

const initialTripsState = {
    fetchState: TripsState.OLDATED,
    data: [],
};

const initialAccountState = {
    fetchState: AccountState.OLDATED,
    data: [],
};

const initialSessionState = {
    userId: null,
};

/*
    id
    name
    description
    short_descripition
    image
    price
    begin_date
    end_data
    available_places
*/

export const tripsReducer = (state = initialTripsState, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                fetchState: TripsState.UP_TO_DATE,
                data: action.trips,
            };
        case "FETCH_REQUEST":
            return {
                ...state,
                fetchState: TripsState.FETCHING,
            };
        default:
            return state;
    }
};

export const accountReducer = (state = initialAccountState, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                fetchState: AccountState.UP_TO_DATE,
                data: action.reservations,
            };
        case "FETCH_REQUEST":
            return {
                ...state,
                fetchState: AccountState.FETCHING,
            };
        default:
            return state;
    }
};

export const sessionReducer = (state = initialSessionState, action) => {
    switch (action.type) {
        case "SET_SESSION":
            return {
                userId: action.userId,
            };
        case "LOGOUT":
            return {
                userId: null,
            };
        default:
            return state;
    }
};
