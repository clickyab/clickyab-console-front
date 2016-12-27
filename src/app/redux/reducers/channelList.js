import {CHANNEL_LIST} from '../actions/index';

export function channelListReducer(state = [], action) {
    switch (action.type) {
        case CHANNEL_LIST:
            return {items: action.data.data, definitions: action.data.definition};
    }

    return state;
}