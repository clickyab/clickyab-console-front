import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {handleError} from "../../functions/catchError";
import {redirectIfLogin} from "../redirectIfLogin";
import {navigate} from "../../functions/navigate";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* redirectIfLogin('/v1');

        navigate('v1/login');
    } catch (error) {
        handleError(error);
    }
});
