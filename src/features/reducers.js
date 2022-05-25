const initialState = {
    trips_fetched : false,
    trips : []
}

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
        case "FETCH_SUCCESS" :
            return {
                trips_fetched : true,
                trips : action.trips
            }
        default:
            return state
    }
}