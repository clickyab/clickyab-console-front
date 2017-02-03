import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";

export default (nextState, replace, next) => sync(function*() {
	try {
		loading(true);
		yield* isLoginMiddleware();
		loading(false);
		next();
	} catch (error) {
		handleError(error);
	}
});