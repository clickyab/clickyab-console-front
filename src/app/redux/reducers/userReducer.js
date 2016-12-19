import {UPDATE_USER} from '../actions/user';


const initial = {
  token: '',
};
export default function userReducer(state = initial, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, action.user);
    }

    return state;
}