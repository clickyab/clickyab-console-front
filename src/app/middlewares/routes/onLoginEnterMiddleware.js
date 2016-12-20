import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";
import ping from "../../functions/ping";


export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware(nextState, replace);

        next()
    } catch (error) {
        error.recover();
        console.log(error.message())
    }
});
