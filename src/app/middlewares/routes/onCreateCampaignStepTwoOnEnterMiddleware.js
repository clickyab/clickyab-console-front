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
        next();
        loading(false);
    } catch (error) {
        handleError(error);
    }
});
