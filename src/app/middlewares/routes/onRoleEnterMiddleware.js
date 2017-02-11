import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {roleListAction, permissionListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";
import {shouldUpdateDefinition} from "../../redux/helpers";

function* roleListController(done) {
    loading(true);
    const result = (yield (new swagger.UserApi())
        .userPermissionsGet(select('user.token'), {
            ...select('queries.role', {}),
            def: shouldUpdateDefinition('roleList')
        })).data;
    dispatch(permissionListAction(result));

    const {error, data} = yield (new swagger.UserApi())
        .userRolesGet(select('user.token'), {
            ...select('queries.role', {}),
            def: true
        });

    done();
    if (!error) {
        dispatch(roleListAction(data));

        loading(false);
    } else {
        throwError("onRoleEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        let {error} = yield raceOnTime(roleListController, 20000);
        if (error)
            return navigate('/v1/profile');

        next();
    } catch (error) {
        handleError(error);
    }
});
