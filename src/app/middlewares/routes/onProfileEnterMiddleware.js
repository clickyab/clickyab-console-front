import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {getToken} from "../../redux/helpers"
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {sessionListAction} from "../../redux/actions/index";


export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		const {error, data} = yield (new swagger.UserApi())
			.userSessionsGet(getToken());

		if (!error) {
			dispatch(sessionListAction(data));
		}
		next();
	} catch (error) {
		handleError(error);
	}
});