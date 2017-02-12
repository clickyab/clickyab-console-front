import {CAMPAIGN_LIST, CAMPAIGN_ITEMS_LIST} from "../actions/index";
export function campaignListReducer(state = [], action) {
	switch (action.type) {
		case CAMPAIGN_LIST:
			return {
				items: action.data.data,
				definitions: action.data.definition || state.definitions,
				total: action.data.total
			};
		case CAMPAIGN_ITEMS_LIST:
			return {...state, items: action.data}
	}

	return state;
}