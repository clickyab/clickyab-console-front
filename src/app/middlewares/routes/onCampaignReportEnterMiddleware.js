import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {campaignReportListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";

function* campaignReportListController(done) {
	loading(true);
	yield* isLoginMiddleware();
	const {error, data} = yield (new swagger.AdApi())
		.campaignReportGet(select('user.token'), {
			...select('queries.campaignReport', {}),
			def: true
		});

	done();
	if (!error) {
		dispatch(campaignReportListAction(data));
		loading(false);
	} else {
		throwError("campaignReportListController", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(campaignReportListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});


