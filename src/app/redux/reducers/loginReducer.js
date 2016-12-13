import {LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT} from '../actions/login';

export default function loginReducer(state = false, action) {
	switch (action.type) {
		case LOGIN_SUCCESSFUL:
			return {
				id: action.id,
				email: action.email,
				token: action.token
			}
		case LOGIN_FAILED:
		case LOGOUT:
			return false;
	}

	return state;
}