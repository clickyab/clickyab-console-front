import {BILLING_LIST} from "./../actions/index";

export function billingListReducer(state = {}, action) {
	switch (action.type) {
		case BILLING_LIST :
			return {
				items: action.data.data,
				definitions: action.data.definition || state.definitions,
				total: action.data.total
			};
	}

	return state;
}