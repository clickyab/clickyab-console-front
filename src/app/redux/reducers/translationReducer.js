import {GET_TRANSLATION} from "../actions/index";

export function translationReducer(state = {}, action) {
    switch (action.type) {
        case GET_TRANSLATION:
            return action.translations;
    }

    return state;
}