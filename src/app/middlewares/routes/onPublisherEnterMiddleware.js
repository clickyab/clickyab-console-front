import {sync} from "../../functions/sync";
import {switchToPublisher, updateLocalStorageAction, publisherTotalViewChart} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from "../../functions/select";
import * as swagger from "../../swagger/index";

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        dispatch(switchToPublisher());
        dispatch(updateLocalStorageAction());

        const {error, data} = yield (new swagger.AdApi())
            .campaignChartPubtotalviewGet(select('user.token', 'no token'))

        if(!error) {
            dispatch(publisherTotalViewChart(data));
        }

        next();
    } catch (error) {
        handleError(error);
    }
});
