import {TELEGRAM_ITEMS_LIST, TELEGRAM_LIST} from "./../actions/index";


export function telegramListReducer(state = [], action) {
    switch (action.type) {
        case TELEGRAM_LIST:
            return {items: action.data.data, definitions: action.data.definition, total: action.data.total};
        case TELEGRAM_ITEMS_LIST:
            return Object.assign({}, state, {items: action.items})
    }

    return state;
}