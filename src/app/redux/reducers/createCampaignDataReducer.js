import {CREATE_CAMPAIGN, DELETE_CAMPAIGN_PROMOTE} from "./../actions/index";

export function createCampaignReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CAMPAIGN :
            return Object.assign({}, state , action.data);
        case DELETE_CAMPAIGN_PROMOTE:
            if (typeof state.promotes != 'undefined') {
                delete state.promotes;
            }
            break;
    }
    return state;
}