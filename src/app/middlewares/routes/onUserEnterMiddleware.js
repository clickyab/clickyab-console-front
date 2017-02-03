import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
import {loading} from "../../functions/loading";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";
import {userListAction} from "../../redux/actions/index";

function* userListController(done) {
	loading(true);
	let {error, data} = yield (new swagger.UserApi())
		.userUsersGet(select('user.token', 'no token'), {
			...select('queries.user', {}),
			def: true
		});


	done();
	if (!error) {
		dispatch(userListAction(data));

		loading(false);
	} else {
		throwError("onUserEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(userListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});
