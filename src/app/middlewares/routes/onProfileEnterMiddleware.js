import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		next();
	} catch (error) {
		handleError(error);
	}
});