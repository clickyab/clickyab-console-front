import {UPDATE_USER, UPDATE_PERSONAL_INFO , UPDATE_CORPORATION_INFO, DETELE_PERSONAL_INFO} from '../actions/user';


export default function userReducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_USER:
			return Object.assign({}, action.user);
		case UPDATE_PERSONAL_INFO:
			return Object.assign({}, state, action.personal);
        case UPDATE_CORPORATION_INFO:
            return Object.assign({}, state, action.corporation);
		case DETELE_PERSONAL_INFO:
			delete state.personal;

	}

	return state;
}