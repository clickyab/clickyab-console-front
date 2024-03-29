import {CATEGORY_ITEMS_LIST, CATEGORY_LIST, UPDATE_CATEGORY_FROM_LIST} from "../actions/index";

function updateARow(state, action) {
	let items = [...state.items];
	for (let i = 0; i < items.length; i++) {
		if (items[i].id == action.data.id) {
			items[i] = Object.assign({}, items[i], action.data);
		}
	}

	return {items, definitions: state.definitions};
}

export function categoryListReducer(state = [], action) {
	switch (action.type) {
		case CATEGORY_LIST:
			return {
				items: action.data.data,
				definitions: action.data.definition || state.definitions,
				total: action.data.total
			};
		case UPDATE_CATEGORY_FROM_LIST:
			return updateARow(state, action);
		case CATEGORY_ITEMS_LIST:
			return Object.assign({}, state, {items: action.data})
	}

	return state;
}