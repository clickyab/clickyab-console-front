import {sync} from "../../functions/sync";
import {
	publisherChannelStatus,
	publisherCountActiveWaitChannel,
	publisherTotalViewChart,
	switchToPublisher,
	updateLocalStorageAction
} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import * as swagger from "../../swagger/index";
import {getToken} from "../../redux/helpers";

function* campaignChartTotalView() {
	const {error, data} = yield (new swagger.AdApi())
		.campaignChartPubtotalviewGet(getToken());

	if (!error) {
		dispatch(publisherTotalViewChart(data));
	}
}

function* countChannelActiveWait() {
	const {error, data} = yield (new swagger.ChannelApi())
		.channelDashboardCountActiveGet(getToken());

	if (!error) {
		dispatch(publisherCountActiveWaitChannel(data));
	}
}

function* channelStatus() {
	const {error, data} = yield (new swagger.ChannelApi())
		.channelChanstatGet(getToken());

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
