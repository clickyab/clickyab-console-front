import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from './../../functions/select';
import {navigate} from "../../functions/navigate";
import {isCampaignMiddleware} from "../isCampaignMiddleware";
import {dispatch} from "../../functions/dispatch";
import {createCampaign} from "../../redux/actions/index";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* isLoginMiddleware();
        if(nextState.params.campaign_name === undefined) {
            dispatch(createCampaign({}));
            loading(false);
            next();
        }
    } catch (error) {
        handleError(error);
    }
});
