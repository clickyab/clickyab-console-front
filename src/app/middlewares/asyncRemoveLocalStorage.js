import {REMOVE_LOCAL_STORAGE} from "../redux/actions/index";
let localStorage = require('store');

export const asyncRemoveLocalStorage = store => next => action => {
    if (action.type === REMOVE_LOCAL_STORAGE) {
        new Promise((resolve) => {
            localStorage.remove('initialState');
            resolve();
        }).then();
    }
    next(action);
};