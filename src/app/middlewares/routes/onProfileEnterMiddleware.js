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
});

