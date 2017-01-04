import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {channelListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {browserHistory} from "react-router";
import {handleError} from "../../functions/catchError";

function* channelListController(done, next) {
	loading(true);
	yield* isLoginMiddleware();
	const {error, data, response} = yield (new swagger.ChannelApi())
		.channelListGet(select('user.token'), {def: true});

	done();
	if (!error) {
		dispatch(channelListAction(data));

		next();
		loading(false);
	} else {
		throwError("onChannelEnterMiddleWare", function () {
			browserHistory.push('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		raceOnTime(channelListController, next, function () {
			browserHistory.push('/v1/login');
		}, 20000);
	} catch (error) {
		handleError(error);
	}
});
