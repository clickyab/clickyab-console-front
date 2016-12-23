import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";

export default (nextState, replace, next) => sync(function*() {
    try {
        yield* isLoginMiddleware();

        next()
    } catch (error) {
        if (error.recover) {
            error.recover();
            console.log(error.message())
        }

        console.log(error);
    }
});
