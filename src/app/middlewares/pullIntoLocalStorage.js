import {UPDATE_LOCAL_STORAGE} from "../redux/actions/index";
let store = require('store');

function blacklist(state, list) {

    return state;
}

export const pullIntoLocalStorage = store => next => action => {
    if (action.type === UPDATE_LOCAL_STORAGE) {
        store.set('initialState', blacklist(store.getState(), [
            'user.password'
        ]));
    }
    next(action);
};