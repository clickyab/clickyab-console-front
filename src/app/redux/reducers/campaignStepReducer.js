import {CAMPAIGN_STEP_TYPE} from './../actions/index';

export function campaignStepReducer(state ={}, action) {
    switch (action.type) {
        case CAMPAIGN_STEP_TYPE:
            return {type: action.data}
    }
    return state;
}