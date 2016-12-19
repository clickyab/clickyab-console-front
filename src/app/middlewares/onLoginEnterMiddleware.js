import swagger from './../swagger/index';
import {getToken, isLogin} from "../redux/helpers";
import sync from './../functions/sync';

function redirectIfLogined(replace) {

}

function ping() {
    return new Promise((resolve, reject) => {
        new swagger.UserApi().userPingGet(getToken(), (error, user, response) => {
            resolve(user);
        })
    });
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
