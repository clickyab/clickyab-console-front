import {IMPERSONATE_SUCCESSFUL, IMPERSONATE_FAILED} from "../actions/impersonate";

export default function impersonateReducer(state = false, action) {
    switch (action.type) {
        case IMPERSONATE_SUCCESSFUL:
            return true;
        case IMPERSONATE_FAILED:
            return false;
    }

    return state;
}