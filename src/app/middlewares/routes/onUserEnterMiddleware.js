import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {select} from "../../functions/select";
import {userListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";


export default (nextState, replace, next) => sync(function*() {
    try {
        let {error, data, response} = yield (new swagger.UserApi())
            .userUsersGet(select('user.token', 'no token'), {def: true});
        window.setTimeout(function () {
            $(".preloader-page").fadeOut();
        }, 500);
        dispatch(userListAction(data));

        next();
    } catch (error) {
        console.log('errors', error);
    }
});
