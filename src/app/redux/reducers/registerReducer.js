import {REGISTER_SUCCESSFUL, REGISTER_FAILED} from '../actions/register';
export default function registerReducer(state = false, action) {
	switch (action.type) {
		case REGISTER_SUCCESSFUL:
			return {
				id: action.id,
				email: action.email,
				token: action.token
			}
		case REGISTER_FAILED:
			return false;
	}

	return state;
}