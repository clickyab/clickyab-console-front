import {ROLE_DATA} from "../actions/index";
export function roleDataReducer(state = {}, action) {
    switch (action.type) {
        case ROLE_DATA:
            return action.data;
    }

    return state;
}