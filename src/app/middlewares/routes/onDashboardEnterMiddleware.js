import {sync} from "../../functions/sync";
import {loading} from "../../functions/loading";
import {handleError} from "../../functions/catchError";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* isLoginMiddleware();
        loading(false);

        next();
    } catch (error) {
        handleError(error);
    }
});
