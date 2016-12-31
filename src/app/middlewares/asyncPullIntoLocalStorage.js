import {UPDATE_LOCAL_STORAGE} from '../redux/actions/index';
let localStorage = require('store');

function blacklist(state, list = []) {
    for (let i = 0; i < list.length; i++) {
        state = Object.assign(state, list[i]);
    }

    return state;
}

export const asyncPullIntoLocalStorage = store => next => action => {
    if (action.type === UPDATE_LOCAL_STORAGE) {
        new Promise((resolve, reject) => {
            localStorage.set('initialState', blacklist(store.getState(), [
                {routing: {}}, {form: {}}
            ]));

            resolve();
        }).then()
    }
    next(action);
};