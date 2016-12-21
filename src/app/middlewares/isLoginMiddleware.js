import ping from "../functions/ping";
import {browserHistory} from 'react-router'
import {AlertBox} from "../functions/notifications";
import {throwError} from "../functions/Error";
import {isLogin} from "../redux/helpers";


export function* isLoginMiddleware(nextState, replace, next) {
    if(isLogin()){
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
}