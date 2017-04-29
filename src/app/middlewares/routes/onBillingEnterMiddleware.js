import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {billingListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* BillingListController(done) {
	yield* isLoginMiddleware();
	const {error, data} = yield (new swagger.BillingApi())
		.billingListGet(select('user.token', 'no token'), {
			sort: 'created_at:DESC',
			...select('queries.billing', {}),
			def: shouldUpdateDefinition('billingList')
		});

	done();
	if (!error) {
		dispatch(billingListAction(data));
	} else {
		throwError("onBillingEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(BillingListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});



