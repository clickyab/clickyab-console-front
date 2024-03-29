import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {categoryListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {handleError} from "../../functions/catchError";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {raceOnTime} from "../../functions/raceOnTime";

function* categoryListController(done) {
	const {error, data} = yield (new swagger.CategoryApi())
		.categoryListGet(select('user.token'), {
			sort: 'created_at:DESC',
			...select('queries.category', {}),
			def: true
		});

	done();
	if (!error) {
		dispatch(categoryListAction(data));
	} else {
		throwError("onCategoryEnterMiddleWare", function () {
			navigate('/v1/login');
		});
	}
}

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		let {error} = yield raceOnTime(categoryListController, 20000);
		if (error)
			navigate('/v1/login');

		next();
	} catch (error) {
		handleError(error);
	}
});

