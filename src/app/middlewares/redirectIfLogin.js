import ping from '../functions/ping';
import {throwError} from '../functions/Error';
import {isLogin} from '../redux/helpers';
import {browserHistory} from 'react-router';

export function* redirectIfLogin() {
    if (isLogin()) {
        let {response} = yield ping();

        if (response.statusCode == 200) {
            throwError('isLoginMiddleware', function () {
                browserHistory.push('/v1/profile');
            }, 'custom message');
        }
    }
}