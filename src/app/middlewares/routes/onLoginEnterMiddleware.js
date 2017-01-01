import {sync} from '../../functions/sync';
import {isLoginMiddleware} from '../isLoginMiddleware';
import {loading} from '../../functions/loading';

export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        yield* isLoginMiddleware();

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
