import {sync} from '../../functions/sync';
import * as swagger from '../../swagger/index';
import { categoryListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {select} from '../../functions/select';
import {loading} from '../../functions/loading';
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {handleError} from "../../functions/catchError";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {raceOnTime} from "../../functions/raceOnTime";

function* categoryListController(done, next) {
    loading(true);
    const {error, data} = yield (new swagger.CategoryApi())
        .categoryListGet(select('user.token'), {
            ...select('queries.channel', {}),
            def: true
        });
    done();
    if (!error) {
        dispatch(categoryListAction(data));

        next();
        loading(false);
    } else {
        throwError("onCategoryEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        raceOnTime(categoryListController, next, function () {
            navigate('/v1/login');
        }, 20000);
    } catch (error) {
        handleError(error);
    }
});

