import {PUBLISHER_TOTAL_VIEW_CHART} from "../actions/index";

export function publisherTotalViewChartReducer(state = [], action) {
	switch (action.type) {
		case PUBLISHER_TOTAL_VIEW_CHART:
			return action.data;
	}

	return state;
}