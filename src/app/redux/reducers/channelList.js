import {CHANNEL_LIST, UPDATE_CHANNEL_FROM_LIST} from '../actions/index';

function updateARow(state, action) {
    let items = [...state.items];
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == action.data.id) {
            items[i] = action.data
        }
    }
    console.log(items);

    return {definitions: state.definitions, items};
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