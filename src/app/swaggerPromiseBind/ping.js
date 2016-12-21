import swagger from '../swagger/index';
import {getToken} from "../redux/helpers";
import {asyncUpdateLocalStorage} from "../functions/asyncUpdateLocalStorage";

export default function ping() {
    return new swagger.UserApi().userPingGet(getToken());
}