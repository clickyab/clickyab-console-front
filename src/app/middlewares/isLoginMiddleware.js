import {isLogin} from '../redux/helpers';
import {browserHistory} from 'react-router';
import {throwError} from "../functions/Error";

export function* isLoginMiddleware() {
    if (!isLogin()) {
        throwError('isLoginMiddleware', function () {
            browserHistory.push('login')
        });
    }
}