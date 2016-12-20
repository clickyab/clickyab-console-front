import ping from "../functions/ping";
import {browserHistory} from 'react-router'
import {AlertBox} from "../functions/notifications";
import {throwError} from "../functions/Error";


export function* isLoginMiddleware(nextState, replace, next) {
    let {user, response} = yield ping();

    if (response.statusCode == 200) {
        throwError('isLoginMiddleware', function () {
            console.log('recovered')
        }, 'custom message');
        replace('/profile');
    } else {
        // browserHistory.push('/login');
        // AlertBox("error", "لطفا در ابتدا وارد حساب کاربری شوید")
    }
}