import {ASSIGN_ROLE_USER_DATA} from "../actions/index";

export function userAssignRoleDataReducer(state = {}, action) {
	switch (action.type) {
		case ASSIGN_ROLE_USER_DATA:
			return action.data;

	}

	return state;
}