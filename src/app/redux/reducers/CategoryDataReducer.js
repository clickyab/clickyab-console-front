import {CATEGORY_DATA} from "../actions/index";
export function categoryDataReducer(state = {}, action) {
    switch (action.type) {
        case CATEGORY_DATA:
            return action.data;
    }

    return state;
}