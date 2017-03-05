import {TRANSLATION} from "../actions/index";

export function translationReducer(state = {}, action) {
    switch (action.type) {
        case TRANSLATION:
            return action.translation;
    }

    return state;
}