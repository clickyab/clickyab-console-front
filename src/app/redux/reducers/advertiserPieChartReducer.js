import {ADVERTISER_PIE_CHART} from "../actions/index";

export function advertiserPieChartReducer(state = [], action) {
    switch (action.type) {
        case ADVERTISER_PIE_CHART:
            return action.data;
    }

    return state;
}