import {PERMISSION_LIST} from '../actions/index';


export function permissionListReducer(state = [], action) {
    switch (action.type) {
        case PERMISSION_LIST:
            return {items: action.data.data, definitions: action.data.definition, total: action.data.total};
    }

    return state;
}