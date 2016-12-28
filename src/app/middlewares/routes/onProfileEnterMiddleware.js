import {sync} from '../../functions/sync';
import ping from '../../functions/ping';
import {browserHistory} from 'react-router';
import {AlertBox} from '../../functions/notifications';
import {loading} from '../../functions/loading';

export default (nextState, replace, next) => sync(function*() {

    loading(true);
    let {error, user, response} = yield ping();
    if (response.statusCode == 200) {
        next();
        browserHistory.push('/profile');
    } else {
        browserHistory.push('/login');
        AlertBox('error', 'لطفا در ابتدا وارد حساب کاربری شوید')
    }
    // try {
    //     loading(true);
    //     let {error, user, response} = yield ping();
    //     if (response.statusCode == 200) {
    //         next();
    //         browserHistory.push('/profile');
    //     } else {
    //         browserHistory.push('/login');
    //         AlertBox("error", "لطفا در ابتدا وارد حساب کاربری شوید")
    //     }
    //     next()
    // } catch (error) {
    //     if (error.recover) {
    //         error.recover();
    //         console.log(error.message())
    //     }
    //     console.log(error);
    // }
});

