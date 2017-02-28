import {sync} from "../../functions/sync";
import {
    switchToPublisher,
    updateLocalStorageAction,
    publisherTotalViewChart,
    publisherCountActiveWaitChannel,
    publisherChannelStatus
} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {select} from "../../functions/select";
import * as swagger from "../../swagger/index";

function* campaignChartTotalView() {
    const {error, data} = yield (new swagger.AdApi())
        .campaignChartPubtotalviewGet(select('user.token', 'no token'))

    if (!error) {
        dispatch(publisherTotalViewChart(data));
    }
}

function* countChannelActiveWait() {
    const {error, data} = yield (new swagger.ChannelApi())
        .channelDashboardCountActiveGet(select('user.token', 'no token'))

    if (!error) {
        dispatch(publisherCountActiveWaitChannel(data));
    }
}

function* channelStatus() {
    const {error, data} = yield (new swagger.ChannelApi())
        .channelChanstatGet(select('user.token', 'no token'))

    if (!error) {
        dispatch(publisherChannelStatus(data));
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        dispatch(switchToPublisher());
        dispatch(updateLocalStorageAction());

        yield* campaignChartTotalView();
        yield* countChannelActiveWait();
        yield* channelStatus();
        next();
    } catch (error) {
        handleError(error);
    }
});
