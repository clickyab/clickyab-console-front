import {sync} from "../../functions/sync";
import {
	advertiserCampaignChartAction,
	advertiserSpentPerChannel,
	switchToAdvertiser,
	updateLocalStorageAction
} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import * as swagger from "../../swagger/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {getToken} from "../../redux/helpers";

export function* campaignSpentPerChannel() {
	const {error, data} = yield (new swagger.AdApi())
		.campaignChartPerchannelGet(getToken());

	if (!error) {
		dispatch(advertiserSpentPerChannel(data));
	} else {
		throwError('campaignSpentPerChannel', () => {
			navigate('v1/panel');
		});
	}
}

export function* campaignChartView() {
	const {error, data} = yield (new swagger.AdApi())
		.campaignChartGet(getToken());

	if (!error) {
		dispatch(advertiserCampaignChartAction(data))
	} else {
		throwError('campaignChartView', () => {
			navigate('v1/panel');
		});
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
