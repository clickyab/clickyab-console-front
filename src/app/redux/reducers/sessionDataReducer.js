import {SESSION_LIST} from "../actions/index";

export function sessionDataReducer(state = {}, action) {
    switch (action.type) {
        case SESSION_LIST:
            return action.data;
    }

    return state;
}