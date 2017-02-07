import {UPDATE_TOKEN} from "../actions/token";
export default function tokenReducer(state = '', action) {
    switch (action.type) {
        case UPDATE_TOKEN:
            return action.token;
    }

    return state;
}