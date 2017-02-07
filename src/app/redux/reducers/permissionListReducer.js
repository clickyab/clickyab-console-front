import {PERMISSION_LIST} from "../actions/index";


export function permissionListReducer(state = [], action) {
    switch (action.type) {
        case PERMISSION_LIST:
            return {permissions: action.data};
    }

    return state;
}