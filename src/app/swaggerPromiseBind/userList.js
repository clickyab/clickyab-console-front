import swagger from '../swagger/index';
import {getToken} from "../redux/helpers";
import {asyncUpdateLocalStorage} from "../functions/asyncUpdateLocalStorage";

export default function userList(options) {
    return new Promise((resolve, reject) => {
        (new swagger.UserApi()).userUsersGet(getToken(), options);
    });
}