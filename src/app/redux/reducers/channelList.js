import {CHANNEL_LIST, UPDATE_CHANNEL_FROM_LIST, ADD_CHANNEL} from '../actions/index';

function updateARow(state, action) {
    let items = [...state.items];
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == action.data.id) {
            items[i] = Object.assign({}, items[i], action.data);
        }
    }

    return {items, definitions: state.definitions};
}

export function channelListReducer(state = [], action) {
    switch (action.type) {
        case CHANNEL_LIST:
            return {items: action.data.data, definitions: action.data.definition};
        case UPDATE_CHANNEL_FROM_LIST:
            return updateARow(state, action);
    }

    return state;
}