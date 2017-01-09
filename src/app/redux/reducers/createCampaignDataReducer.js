import {CREATE_CAMPAIGN} from './../actions/index';

export function createCampaignReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_CAMPAIGN :
            return action.data;
    }
    return state;
}