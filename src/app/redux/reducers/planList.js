import {PLAN_LIST} from '../actions/index';
export function planListReducer(state = [], action) {
    switch (action.type) {
        case PLAN_LIST:
            return {items: action.data};
    }
    return state;
}