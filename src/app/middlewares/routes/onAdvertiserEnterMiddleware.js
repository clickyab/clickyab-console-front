import {sync} from "../../functions/sync";
import {
    switchToAdvertiser,
    updateLocalStorageAction,
    advertiserSpentPerChannel,
    advertiserCampaignChartAction
} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from "../../functions/select";
import * as swagger from "../../swagger/index";

export function* campaignSpentPerChannel() {
    const {error, data} = yield (new swagger.AdApi())
        .campaignChartPerchannelGet(select('user.token', 'no token'))

    if (!error) {
        dispatch(advertiserSpentPerChannel(data));
    }
}

export function* campaignChartView() {
    const {error, data} = yield (new swagger.AdApi())
        .campaignChartGet(select('user.token', 'no token'))

    if (!error) {
        dispatch(advertiserCampaignChartAction(data))
    }
}


export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        dispatch(switchToAdvertiser());
        dispatch(updateLocalStorageAction());
        yield* campaignSpentPerChannel();
        yield* campaignChartView();
        next();
    } catch (error) {
        handleError(error);
    }
});
