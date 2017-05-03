import {SWITCH_TO_PERSONAL, SWITCH_TO_CORPORATION} from "../actions/index";

export default function profileTypeReducer(state = '', action) {
    switch (action.type) {
        case SWITCH_TO_PERSONAL:
            return 'personal';
        case SWITCH_TO_CORPORATION:
            return 'corporation';
    }

    return state;
}