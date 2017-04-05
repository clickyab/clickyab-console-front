import {LOCALE} from "../actions/index";


export function languageReducer(state = "fa_IR", action) {
	switch (action.type) {
		case LOCALE:
			return action.locale;
	}

	return state;
}