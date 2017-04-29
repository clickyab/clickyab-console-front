import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {telegramListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* telegramListController(done) {
	const {error, data} = yield (new swagger.TelegramApi())
		.telegramListGet(select('user.token'), {
			sort: 'created_at:DESC',
			...select('queries.telegram', {}),
			def: shouldUpdateDefinition('telegramList')
		});

	done();
	if (!error) {
		dispatch(telegramListAction(data));
	} else {
		throwError("onTelegramEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(telegramListController, 20000);
		if (error)
			return navigate('/v1/profile');

		next();
	} catch (error) {
		handleError(error);
	}
});
