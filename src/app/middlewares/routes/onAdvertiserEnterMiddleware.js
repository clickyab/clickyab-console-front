import {sync} from '../../functions/sync';
import {switchToAdvertiser} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();
        dispatch(switchToAdvertiser());

        next();
    } catch (error) {
        handleError(error);
    }
});
