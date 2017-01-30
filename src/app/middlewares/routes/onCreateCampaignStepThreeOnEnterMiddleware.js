import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from './../../functions/select';
import {navigate} from "../../functions/navigate";
import {isCampaignMiddleware} from "../isCampaignMiddleware";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);

        yield* isLoginMiddleware();
        yield* isCampaignMiddleware(nextState);
        // if (select('createCampaignData.promotes.cli_message_id') != null) {
        //     navigate('/v1/campaign/create/:campaign_id:/step/plan', {
        //         campaign_id: select('createCampaignData.id')
        //     });
        //     loading(false);
        // } else {
            next();
            loading(false);
        // }
    } catch (error) {
        handleError(error);
    }
});
