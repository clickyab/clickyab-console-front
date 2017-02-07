import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {campaignListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";

function* campaignListController(done) {
    loading(true);
    yield* isLoginMiddleware();
    const {error, data} = yield (new swagger.AdApi())
        .campaignListGet(select('user.token'), {
            ...select('queries.campaign', {}),
            def: true
        });

    done();
    if (!error) {
        dispatch(campaignListAction(data));
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
        let {error} = yield raceOnTime(campaignListController, 20000);
        if (error)
            navigate('/v1/login');

        next();
    } catch (error) {
        handleError(error);
    }
});



