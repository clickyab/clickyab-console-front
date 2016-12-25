import {store} from './../redux/store';

export function select(key, defaultValue, removeNull = false) {
    let value = store.getState();
    const parts = key.split('.');

    for (let i = 0; i < parts.length; i++) {
        if (value[parts[i]]) {
            value = value[parts[i]];
        } else {
            return defaultValue || null;
        }
    }

    let _value = {};
    if (typeof value === "object" && removeNull) {
        for (let property in value) {
            if (value[property]) {
                _value[property] = value[property];
            }
        }

        value = _value;
    }


    return value;
}