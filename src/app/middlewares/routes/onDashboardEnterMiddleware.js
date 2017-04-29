import {sync} from "../../functions/sync";
import {handleError} from "../../functions/catchError";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();

		next();
	} catch (error) {
		handleError(error);
	}
});
