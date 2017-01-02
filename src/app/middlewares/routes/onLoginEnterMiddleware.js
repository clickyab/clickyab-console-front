import {sync} from '../../functions/sync';
import {loading} from '../../functions/loading';
import {redirectIfLogin} from "../redirectIfLogin";

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* redirectIfLogin();

        next()
    } catch (error) {
        if (error.recover) {
            error.recover();
            console.log(error.message())
        } else {
            console.log('oopsify');
            console.log(error);
        }
    }
});
