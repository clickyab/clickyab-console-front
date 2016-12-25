import {store} from './../redux/store';

export function select(key, defaultValue) {
    let value = store.getState();
    const parts = key.split('.');

    for (let i = 0; i < parts.length; i++) {
        if (value[parts[i]]) {
            value = value[parts[i]];
        } else {
            return defaultValue || null;
        }
    }

    return value;
}