import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {channelListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* channelListController(done) {
	yield* isLoginMiddleware();
	const {error, data} = yield (new swagger.ChannelApi())
		.channelListGet(select('user.token'), {
			sort: 'created_at:DESC',
			...select('queries.channel', {}),
			def: shouldUpdateDefinition('channelList')
		});

	done();
	if (!error) {
		dispatch(channelListAction(data));
	} else {
		throwError("onChannelEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(channelListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});
