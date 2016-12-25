import {sync} from "../../functions/sync";
import ping from "../../functions/ping";
import {browserHistory} from 'react-router';
import {AlertBox} from "../../functions/notifications";
import removePageLoader from "../../functions/RemovePageLoader";

export default (nextState, replace, next) => sync(function*() {
    let {error, user, response} = yield ping();
    if (response.statusCode == 200) {
        next();
        browserHistory.push('/profile');
    } else {
        browserHistory.push('/login');
        AlertBox("error", "لطفا در ابتدا وارد حساب کاربری شوید")
    }
});

