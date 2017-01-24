import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from './../../functions/select';
import {navigate} from "../../functions/navigate";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* isLoginMiddleware();


        const id = select('createCampaignData.id', false);
        if(id) {
            navigate('/v1/campaign/create/:campaign_id:/step/name', {
                campaign_id: select('createCampaignData.id')
            });
        } else {
            loading(false);
            next();
        }


    } catch (error) {
        handleError(error);
    }
});
