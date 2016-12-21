import ping from "../swaggerPromiseBind/ping";
import {throwError} from "../functions/Error";
import {isLogin} from "../redux/helpers";


export function* isLoginMiddleware() {
    if (isLogin()) {
        let {user, response} = yield ping();

        if (response.statusCode == 200) {
            throwError('isLoginMiddleware', function () {
                console.log('recovered')
            }, 'custom message');
        }
    }
}