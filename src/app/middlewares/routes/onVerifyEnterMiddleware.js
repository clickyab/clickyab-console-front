import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {isCampaignMiddleware} from "../isCampaignMiddleware";
import {navigate} from "../../functions/navigate";
import {select} from "../../functions/select";

export default (nextState, replace, next) => sync(function*() {

    try {
        loading(true);
        yield* isLoginMiddleware();
        yield* isCampaignMiddleware({params:{campaign_id:select('createCampaignData.id')}});

        // navigate('campaign/create/:campaign_id:/step/preview', {
        //     campaign_id: select('createCampaignData.id')
        // });
        next();
        loading(false);
    } catch (error) {
        handleError(error);
    }
});
