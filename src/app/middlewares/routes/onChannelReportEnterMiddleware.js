import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {throwError} from "../../functions/Error";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";
import {channelReportListAction} from "../../redux/actions/index";
import {shouldUpdateDefinition} from "../../redux/helpers";


export default (nextState, replace, next) => sync(function*() {
	let id = nextState.params.channel_id;
	try {
		yield* isLoginMiddleware();

		const {error, data} = yield (new swagger.ChannelApi())
			.channelSpecificIdGet(id, select('user.token'), {
				sort: 'created_at:DESC',
				...select('queries.channelReport', {}),
				def: shouldUpdateDefinition('channelReportList')
			});

		if (!error) {
			dispatch(channelReportListAction(data));
		} else {
			throwError("onChannelEnterMiddleWare", function () {
				navigate('/v1/login');
			});
		}

		next();
	} catch (error) {
		handleError(error);
	}
});
