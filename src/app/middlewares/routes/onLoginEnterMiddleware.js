import swagger from '../../swagger/index';
import {getToken, isLogin} from "../../redux/helpers";
import {sync} from '../../functions/sync';

function redirectIfLogined(replace) {

}




export default (nextState, replace, next) => sync(function*() {
    if (isLogin()) {
        let user = yield ping();
        console.log('milad milad miald dorosdt ');
        next();
    } else {
        next();
    }
});
