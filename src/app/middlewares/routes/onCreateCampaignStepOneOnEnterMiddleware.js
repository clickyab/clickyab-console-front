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
        if (select('createCampaignData.id') != null) {
            navigate('/v1/campaign/create/step/2');
        } else {
            next();
        }
    } catch (error) {
        handleError(error);
    }
});
