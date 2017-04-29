import {sync} from "../../functions/sync";
import {redirectIfLogin} from "../redirectIfLogin";
import getTranslate from './../../functions/getTranslate';

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* redirectIfLogin();
		yield* getTranslate();

		next();
	} catch (error) {
		if (error.recover) {
			error.recover();
			console.log(error.message())
		} else {
			console.log(error);
		}
	}
});
