import {isLogin} from '../redux/helpers';
import {throwError} from "../functions/Error";
import {navigate} from "../functions/navigate";

export function* isLoginMiddleware() {
    if (!isLogin()) {
        throwError('isLoginMiddleware', function () {
            navigate('/v1/login')
        });
    }
}