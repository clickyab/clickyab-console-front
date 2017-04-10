import {DEPOSIT_ITEM} from "../actions/index";
export function depositItemReducer(state = {}, action) {
	switch (action.type) {
		case DEPOSIT_ITEM:
			return action.data;
	}

	return state;
}