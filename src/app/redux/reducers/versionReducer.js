import {VERSION} from "../actions/index";

export function versionReducer(state = '', action) {
	switch (action.type) {
		case VERSION:
			return action.version;
	}

	return state;
}