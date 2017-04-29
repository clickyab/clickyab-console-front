import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {translationListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";
import {getToken, shouldUpdateDefinition} from "../../redux/helpers";

function* translationListController(done) {
	const {error, data} = yield (new swagger.MiscApi())
		.miscTranslateLangGet(select("locale"), getToken(), {
			sort: 'created_at:DESC',
			...select('queries.translation', {}),
			def: shouldUpdateDefinition('translationList')
		});

	done();
	if (!error) {
		dispatch(translationListAction(data));
	} else {
		throwError("translationListController", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(translationListController, 20000);
		if (error)
			return navigate('/v1/profile');

		next();
	} catch (error) {
		handleError(error);
	}
});
