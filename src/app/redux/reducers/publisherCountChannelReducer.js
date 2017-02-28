import {PUBLISHER_COUNT_ACTIVE_WAIT_CHANNEL, PUBLISHER_CHANNEL_STATUS} from "../actions/index";

export function publisherCountChannelReducer(state = {}, action) {
    switch (action.type) {
        case PUBLISHER_COUNT_ACTIVE_WAIT_CHANNEL:
            return Object.assign({}, state, {activeWait: action.data});
        case PUBLISHER_CHANNEL_STATUS:
            return Object.assign({}, state, {channelStatus: action.data});
    }

    return state;
}