export const TripsState = {};

function define(name, value) {
    Object.defineProperty(TripsState, name, {
        value: value,
        writable: false,
        enumerable: true,
    });
}

define("UP_TO_DATE", "UP_TO_DATE");
define("FETCHING", "FETCHING");
define("OLDATED", "OLDATED");

Object.freeze(TripsState);

const initialState = {
    tripsState: TripsState.OLDATED,
    trips: [],
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

export const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                tripsState: TripsState.UP_TO_DATE,
                trips: action.trips,
            };
        case "FETCH_REQUEST":
            return {
                ...state,
                tripsState: TripsState.FETCHING,
            };
        default:
            return state;
    }
};
