import {TRANSLATION_LIST} from "../actions/index";

export function translationListReducer(state = {}, action) {
    switch (action.type) {
        case TRANSLATION_LIST:
            console.log({
                items: action.data.data,
                definitions: action.data.definition || state.definitions,
                total: action.data.total
            });
            return {
            items: action.data.data,
            definitions: action.data.definition || state.definitions,
            total: action.data.total
        };
    }

    return state;
}