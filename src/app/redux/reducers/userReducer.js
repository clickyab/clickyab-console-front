import {UPDATE_USER, UPDATE_PERSONAL_INFO , UPDATE_CORPORATION_INFO} from '../actions/user';


export default function userReducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_USER:
			return Object.assign({}, action.user);
		case UPDATE_PERSONAL_INFO:
			return Object.assign({}, state, {personal: action.user});
        case UPDATE_CORPORATION_INFO:
            return Object.assign({}, state, {corporation: action.user});
	}
	return state;
}