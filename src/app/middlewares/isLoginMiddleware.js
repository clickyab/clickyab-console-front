import {isLogin} from "../redux/helpers";
import {throwError} from "../functions/Error";
import {navigate} from "../functions/navigate";
import ping from "../functions/ping";

export function* isLoginMiddleware() {
    let {error} = yield ping();

    if (error || !isLogin()) {
        throwError('isLoginMiddleware', function () {
            navigate('/v1/login')
        });
    }
}