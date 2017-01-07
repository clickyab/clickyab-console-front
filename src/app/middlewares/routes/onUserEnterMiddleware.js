import {sync} from '../../functions/sync';
import * as swagger from '../../swagger/index';
import {select} from '../../functions/select';
import {userItemsListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {loading} from '../../functions/loading';


export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        let {data} = yield (new swagger.UserApi())
            .userUsersGet(select('user.token', 'no token'), {
                ...select('queries.user', {}),
                def: true
            });

        dispatch(userItemsListAction(data));

        next();
    } catch (error) {
        console.log('errors', error);
    }
});
