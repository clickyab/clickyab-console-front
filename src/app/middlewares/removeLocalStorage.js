import {REMOVE_LOCAL_STORAGE} from "../redux/actions/index";
let localStorage = require('store');

export const removeLocalStorage = store => next => action => {
    if (action.type === REMOVE_LOCAL_STORAGE) {
        localStorage.remove('initialState');
    }
    next(action);
};