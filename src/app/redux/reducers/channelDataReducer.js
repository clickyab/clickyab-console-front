import {CHANNEL_DATA} from "../actions/index";
export function channelDataReducer(state = {}, action) {
    switch (action.type) {
        case CHANNEL_DATA:
            return action.data;
    }

    return state;
}