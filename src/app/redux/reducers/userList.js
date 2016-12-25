import {USER_LIST} from "../actions/index";

export function userListReducer(state = [], action) {
    switch (action.type) {
        case USER_LIST:
            return {items: action.data.data, definitions: action.data.definition};
    }

    return state;
}