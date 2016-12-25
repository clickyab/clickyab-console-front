import {CAMPAIGN_LIST} from "../actions/index";
export function campaignListReducer(state = [], action) {
    switch (action.type) {
        case CAMPAIGN_LIST:
            return {items: action.data.data, definitions: action.data.definition};
    }

    return state;
}