import {sync} from "../../functions/sync";
import {switchToPublisher, updateLocalStorageAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		dispatch(switchToPublisher());
		dispatch(updateLocalStorageAction());
		next();
	} catch (error) {
		handleError(error);
	}
});
