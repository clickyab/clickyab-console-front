import {sync} from "../../functions/sync";
import {switchToAdvertiser, updateLocalStorageAction, advertiserPieChart} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from "../../functions/select";
import * as swagger from "../../swagger/index";

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        dispatch(switchToAdvertiser());
        dispatch(updateLocalStorageAction());
        const {error, data} = yield (new swagger.AdApi())
            .campaignDashboardPieChartGet(select('user.token', 'no token'))

        if(!error) {
            dispatch(advertiserPieChart(data));
        }

        next();
    } catch (error) {
        handleError(error);
    }
});
