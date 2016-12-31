import {sync} from '../../functions/sync';
import * as swagger from '../../swagger/index';
import {select} from '../../functions/select';
import {userListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {loading} from '../../functions/loading';


export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        let {error, data, response} = yield (new swagger.UserApi())
            .userUsersGet(select('user.token', 'no token'), {def: true});

        dispatch(userListAction(data));

        next();
    } catch (error) {
        console.log('errors', error);
    }
});
