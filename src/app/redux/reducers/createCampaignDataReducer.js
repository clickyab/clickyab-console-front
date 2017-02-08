import {CREATE_CAMPAIGN, DELETE_CAMPAIGN_PROMOTE} from "./../actions/index";

export function createCampaignReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CAMPAIGN :
            if(Object.getOwnPropertyNames(action.data).length === 0) {
                return action.data;
            } else {
                return Object.assign({}, state , action.data);
            }
        case DELETE_CAMPAIGN_PROMOTE:
            if (typeof state.promotes != 'undefined') {
                delete state.promotes;
            }
            break;
    }
    return state;
}