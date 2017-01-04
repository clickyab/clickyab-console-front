import {CHANGE_QUERY} from "../actions/index";

function spreadQueries(state, {list, queries}) {
    if(state.list) {
        state = Object.assign({}, state, {});
    }

    return state;
}

export default function queryReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_QUERY:
            return spreadQueries(state, action);
    }

    return state;
}