import {sync} from '../../functions/sync';
import * as swagger from '../../swagger/index';
import {select} from '../../functions/select';
import {userItemsListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {loading} from '../../functions/loading';
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {raceOnTime} from "../../functions/raceOnTime";
import {handleError} from "../../functions/catchError";

function* userListController(done, next) {
    loading(true);
    let {error, data} = yield (new swagger.UserApi())
        .userUsersGet(select('user.token', 'no token'), {
            ...select('queries.user', {}),
            def: true
        });


    done();
    if (!error) {
        dispatch(userItemsListAction(data));

        next();
        loading(false);
    } else {
        throwError("onUserEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        raceOnTime(userListController, next, function () {
            navigate('/v1/login');
        }, 20000);
    } catch (error) {
        handleError(error);
    }
});
