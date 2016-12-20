import ping from "../functions/ping";
import {browserHistory} from 'react-router'
import {AlertBox} from "../functions/notifications";


export function* isLoginMiddleware(nextState, replace, next) {
    let {error, user, response} = yield ping();
    console.log(error);
    console.log(user);
    console.log(response);
    console.log('is login middleware');

    // if (response.statusCode == 200) {
    //     replace('/profile');
    // } else {
    //     browserHistory.push('/login');
    //     AlertBox("error", "لطفا در ابتدا وارد حساب کاربری شوید")
    // }
}