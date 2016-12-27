import {CATEGORY_LIST} from '../actions/index';
export function categoryListReducer(state = [], action) {
    switch (action.type) {
        case CATEGORY_LIST:
            return {items: action.data.data, definitions: action.data.definition};
    }

    return state;
}