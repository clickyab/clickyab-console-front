import {ASSIGN_ROLE_USER_LIST} from "../actions/index";

export function userAssignRoleListReducer(state = {}, action) {
    switch (action.type) {
        case ASSIGN_ROLE_USER_LIST:
            return action.data;

    }

    return state;
}