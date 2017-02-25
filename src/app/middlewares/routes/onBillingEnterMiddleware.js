import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {billingListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* BillingListController(done) {
    loading(true);
    yield* isLoginMiddleware();
    const {error, data} = yield (new swagger.BillingApi())
        .billingGet(select('user.token', 'no token'), {
            ...select('queries.billing', {}),
            def: !shouldUpdateDefinition('billingList') //TODO: Check it later;
        });

    done();
    if (!error) {
        dispatch(billingListAction(data));
        loading(false);
    } else {
        throwError("onBillingEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        let {error} = yield raceOnTime(BillingListController, 20000);
        if (error)
            navigate('/v1/login');

        next();
    } catch (error) {
        handleError(error);
    }
});



