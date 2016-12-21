import {sync} from "../../functions/sync";
import {getToken} from "../../redux/helpers";
import * as swagger from "../../swagger/index";


export default (nextState, replace, next) => sync(function*() {
    let {error, data, response} = yield (new swagger.UserApi()).userUsersGet(getToken(), {});
    console.log(error, data, response);
    next()
});
