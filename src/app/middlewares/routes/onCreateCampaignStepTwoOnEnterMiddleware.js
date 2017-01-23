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
        if (select('campaignStepData.type') == 'upload') {
            navigate('/v1/campaign/create/step/upload');
            loading(false);
        } else if(select('campaignStepData.type') == 'promote') {
            navigate('/v1/campaign/create/step/promote');
            loading(false);
        } else {
            next();
            loading(false);
        }
    } catch (error) {
        handleError(error);
    }
});
