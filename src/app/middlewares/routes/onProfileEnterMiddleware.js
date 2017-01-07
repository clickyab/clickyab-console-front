import {sync} from '../../functions/sync';
import ping from '../../functions/ping';
import {AlertBox} from '../../functions/notifications';
import {loading} from '../../functions/loading';
import {navigate} from "../../functions/navigate";

export default (nextState, replace, next) => sync(function*() {
    loading(true);
    let {error, user, response} = yield ping();
    if (response.statusCode == 200) {
        next();
        navigate('/v1/profile');
   loading(false);
    } else {
        navigate('/v1/login');
        AlertBox('error', 'لطفا در ابتدا وارد حساب کاربری شوید')
    }
    // try {
    //     loading(true);
    //     let {error, user, response} = yield ping();
    //     if (response.statusCode == 200) {
    //         next();
    //         browserHistory.push('/v1/profile');
    //     } else {
    //         browserHistory.push('/v1/login');
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

