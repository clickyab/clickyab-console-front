import ping from "../functions/ping";

export function* isLoginMiddleware() {
	let user = yield ping();
}