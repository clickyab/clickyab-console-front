import {store} from './../redux/store';

export default function selectData(key, defaultValue) {
    var value = store.getState();
    var parts = key.split('.');

    for(var i = 0; i < parts.length; i++){
        if(value[parts[i]]) {
            value = value[parts[i]];
        } else {
            return defaultValue;
        }
    }

    return value;
}