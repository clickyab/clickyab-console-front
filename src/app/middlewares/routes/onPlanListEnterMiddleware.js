import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {planListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";
import {isCampaignMiddleware} from "../isCampaignMiddleware";

function* planListController(done) {
    loading(true);
    yield* isLoginMiddleware();
    const {error, data} = yield (new swagger.PlanApi())
        .planGet(select('user.token'));

    done();
    if (!error) {
        dispatch(planListAction(data));
        loading(false);
    } else {
        throwError("onChannelEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        yield* isCampaignMiddleware(nextState);
        let {error} = yield raceOnTime(planListController, 20000);
        if (error)
            navigate('/v1/login');
        next();
    } catch (error) {
        handleError(error);
    }
});



