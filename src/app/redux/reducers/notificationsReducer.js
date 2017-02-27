import {NOTIFICATIONS, EMPTY_NOTIFICATIONS} from "../actions/index";

export function notificationsReducer(state = [], action) {
	switch (action.type) {
		case NOTIFICATIONS:
			return [...state, action.notification];
		case EMPTY_NOTIFICATIONS:
			return [];
	}

	return state;
}