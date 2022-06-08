export const TripsState = {};

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

Object.freeze(TripsState);

const initialTripsState = {
    fetchState: TripsState.OLDATED,
    data: [],
};

const initialSessionState = null;

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

export const sessionReducer = (state = initialSessionState, action) => {
        switch (action.type) {
            case "SET_SESSION":
                return {
                    id : action.id,
                    name: action.name,
                    last_name: action.last_name,
                    email: action.email,
                }
            case "LOGOUT" : 
                return null;
            default:
                return state;
        }
}
