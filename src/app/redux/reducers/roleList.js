import {ROLE_LIST, UPDATE_ROLE_FROM_LIST, ROLE_ITEMS_LIST} from '../actions/index';

function updateARow(state, action) {
    let items = [...state.items];
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == action.data.id) {
            items[i] = Object.assign({}, items[i], action.data);
        }
    }

    return {items, definitions: state.definitions};
}

export function roleListReducer(state = [], action) {
    switch (action.type) {
        case ROLE_LIST:
            return {items: action.data.data, definitions: action.data.definition, total: action.data.total};
        case UPDATE_ROLE_FROM_LIST:
            return updateARow(state, action);
        case ROLE_ITEMS_LIST:
            return {...state, items: action.items}
    }

    return state;
}