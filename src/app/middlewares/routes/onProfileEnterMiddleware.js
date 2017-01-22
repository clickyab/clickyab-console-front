import {sync} from '../../functions/sync';
import ping from '../../functions/ping';
import {AlertBox} from '../../functions/notifications';
import {loading} from '../../functions/loading';
import {navigate} from "../../functions/navigate";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
    loading(true);
    yield* isLoginMiddleware();
    loading(false);
    next();
});