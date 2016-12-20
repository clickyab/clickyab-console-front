import {sync} from "../../functions/sync";
import ping from "../../functions/ping";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
	yield isLoginMiddleware();

	let pingo = yield ping();
	console.log(pingo);

	next()
});

