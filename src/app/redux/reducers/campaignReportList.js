import {CAMPAIGN_REPORT_LIST, CAMPAIGN_REPORT_ITEMS_LIST} from "../actions/index";
export function campaignReportListReducer(state = [], action) {
	switch (action.type) {
		case CAMPAIGN_REPORT_LIST:
			return {
				items: action.data.data,
				definitions: action.data.definition || state.definitions,
				total: action.data.total
			};
		case CAMPAIGN_REPORT_ITEMS_LIST:
			return {...state, items: action.data}
	}

	return state;
}