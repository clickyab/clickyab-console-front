import swagger from '../swagger/index';
import select from './../functions/select-data';
export default function ping() {
    return new swagger.UserApi().userPingGet(select('user.token', 'no token'));
}