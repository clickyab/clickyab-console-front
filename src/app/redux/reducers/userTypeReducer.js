import {SWITCH_TO_ADVERTISER, SWITCH_TO_PUBLISHER} from "../actions/index";

export default function userTypeReducer(state = "advertiser", action) {
	switch (action.type) {
		case SWITCH_TO_ADVERTISER:
			return 'advertiser';
		case SWITCH_TO_PUBLISHER:
			return 'publisher';
	}

	return state;
}