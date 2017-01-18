import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {telegramListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {navigate} from "../../functions/navigate";

function* telegramListController(done) {
    loading(true);
    const {error, data} = yield (new swagger.TelegramApi())
        .telegramListGet(select('user.token'), {
            ...select('queries.telegram', {}),
            def: true
        });

    done();
    if (!error) {
        dispatch(telegramListAction(data));

        loading(false);
    } else {
        throwError("onTelegramEnterMiddleWare", function () {
            navigate('/v1/login');
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        let {error, success} = yield raceOnTime(telegramListController, 100);
        if (error)
            return navigate('/v1/profile');

        console.log(success);
        next();
    } catch (error) {
        handleError(error);
    }
});
