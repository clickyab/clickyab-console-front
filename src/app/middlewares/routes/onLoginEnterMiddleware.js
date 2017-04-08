import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {redirectIfLogin} from "../redirectIfLogin";
import getTranslate from './../../functions/getTranslate';

export default (nextState, replace, next) => sync(function*() {
	try {
		loading(true);
		yield* redirectIfLogin();
		yield* getTranslate();
		loading(false);

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
