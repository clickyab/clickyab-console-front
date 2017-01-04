import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {redirectIfLogin} from "../redirectIfLogin";
import {handleError} from "../../functions/catchError";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* redirectIfLogin();
		loading(false);

        next();
    } catch (error) {
        handleError(error);
    }
});
