import {CHANNEL_REPORT_LIST, CHANNEL_ITEMS_REPORT_LIST} from "../actions/index";

export function channelReportListReducer(state = [], action) {
    switch (action.type) {
        case CHANNEL_REPORT_LIST:
            return {items: action.data.data, definitions: action.data.definition, total: action.data.total};
        case CHANNEL_ITEMS_REPORT_LIST:
            return {...state, items: action.items}
    }

    return state;
}