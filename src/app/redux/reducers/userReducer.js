import {UPDATE_USER} from '../actions/user';

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_USER:
			return true;
	}

	return state;
}