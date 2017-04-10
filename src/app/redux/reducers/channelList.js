import {CHANNEL_ITEMS_LIST, CHANNEL_LIST, UPDATE_CHANNEL_FROM_LIST , UPDATE_DEPOSIT_DATA} from "../actions/index";

function updateARow(state, action) {
	let items = [...state.items];
	for (let i = 0; i < items.length; i++) {
		if (items[i].id == action.data.id) {
			items[i] = Object.assign({}, items[i], action.data);
		}
	}

	return {items, definitions: state.definitions};
}

export function channelListReducer(state = [], action) {
	switch (action.type) {
		case CHANNEL_LIST:
			return {
				items: action.data.data,
				definitions: action.data.definition || state.definitions,
				total: action.data.total
			};
		case UPDATE_CHANNEL_FROM_LIST:
			return updateARow(state, action);
        case UPDATE_DEPOSIT_DATA:
            return updateARow(state, action);
		case CHANNEL_ITEMS_LIST:
			return {...state, items: action.items}
	}

	return state;
}