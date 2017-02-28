import {ADVERTISER_CAMPAIGN_CHART} from "../actions/index";

export function advertiserCampaignChartReducer(state = [], action) {
    switch (action.type) {
        case ADVERTISER_CAMPAIGN_CHART:
            return action.data;
    }

    return state;
}