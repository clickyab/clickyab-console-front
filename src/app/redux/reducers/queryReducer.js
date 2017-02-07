import {CHANNEL_QUERY} from "../actions/index";
function spreadQueries(state, {list, query_name, queries}) {
    let newState;
    if (state[list]) {
        newState = Object.assign({}, state, {[list]: {...state[list], [query_name]: queries}});
    } else {
        newState = Object.assign({}, state, {[list]: {[query_name]: queries}});
    }

    return newState;
}

export default function queryReducer(state = {}, action) {
    switch (action.type) {
        case CHANNEL_QUERY:
            return spreadQueries(state, action);
    }

    return state;
}