import {USER_LIST, USER_ITEMS_LIST} from "../actions/index";

export function userListReducer(state = [], action) {
	switch (action.type) {
		case USER_LIST:
			return {items: action.data.data, definitions: action.data.definition, total: action.data.total};
		case USER_ITEMS_LIST:
			return {...state, items: action.data}
	}

	return state;
}