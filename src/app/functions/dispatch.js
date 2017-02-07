import {store} from "./../redux/store";

export function dispatch(action) {
    store.dispatch(action);
}