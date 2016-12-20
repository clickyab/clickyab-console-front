import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";
import ping from "../../functions/ping";

// checkPermissions, isLogin

function* checkUserRoutePermission() {
	yield 'chejoori ha ha ha ha';
}
function* aa() {
	yield ping();
}

function* bb() {
	yield ping();
}

function* cc() {
	yield ping();
}

function* ff() {
	yield 'chejoori ha ha ha ha';
}
export default (nextState, replace, next) => sync(function*() {
	// let login = yield isLoginMiddleware();
	// console.log('we are here', login);
	// let hasan = yield checkUserRoutePermission();
	// console.log('answer', hasan);
	// let a = yield aa();
	// console.log('a', a);
	// let b = yield bb();
	// console.log('b', b);
	// let c= yield cc();
	// console.log('c', c);
	// let f= yield ff();
	// console.log('f', f);
	let pingo = yield ping();
	console.log(pingo);
	let bbb = yield ping();
	console.log(bbb);
	// runMiddleware([isLoginMiddleware]);
	next()
});
