import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
	yield* isLoginMiddleware(nextState, replace);

	next()
});

