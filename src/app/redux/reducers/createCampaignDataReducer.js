import {CREATE_CAMPAIGN, DELTE_CAMPAIGN_PROMOTE} from './../actions/index';

export function createCampaignReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CAMPAIGN :
            return action.data;
        case DELTE_CAMPAIGN_PROMOTE:
            if (typeof state.promotes != 'undefined') {
                delete state.promotes;
            }
            break;
    }
    return state;
}