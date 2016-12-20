import {sync} from "../../functions/sync";
import ping from "../../functions/ping";

export default (nextState, replace, next) => sync(function*() {
	let pingo = yield ping();
	console.log(pingo);

	next()
});

