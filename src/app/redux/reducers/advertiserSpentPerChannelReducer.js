import {ADVERTISER_SPENT_PER_CHANNEL} from "../actions/index";

export function advertiserSpentPerChannelReducer(state = [], action) {
	switch (action.type) {
		case ADVERTISER_SPENT_PER_CHANNEL:
			return action.data;
	}

	return state;
}