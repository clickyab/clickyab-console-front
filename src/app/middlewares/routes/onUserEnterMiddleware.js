import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";
import {assignRoleToUserList, userListAction} from "../../redux/actions/index";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* userListController(done) {
	let {error, data} = yield (new swagger.UserApi())
		.userUsersGet(select('user.token', 'no token'), {
			...select('queries.user', {}),
			def: shouldUpdateDefinition('userList')
		});

	done();
	if (!error) {
		dispatch(userListAction(data));
	} else {
		throwError("onUserEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

function* userAssignRole() {
	let {response, data} = yield (new swagger.UserApi())
		.userAllrolesGet(select('user.token', 'no token'));

	if (response.statusCode == '200') {
		dispatch(assignRoleToUserList(data));
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		yield* userAssignRole();
		let {error} = yield raceOnTime(userListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});
