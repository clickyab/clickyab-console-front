import {UPDATE_USER} from '../actions/user';


export default function userReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, action.user);
    }

    return state;
}