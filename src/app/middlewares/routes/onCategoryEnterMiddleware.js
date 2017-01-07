import {sync} from '../../functions/sync';
import * as swagger from '../../swagger/index';
import { categoryListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {select} from '../../functions/select';
import {loading} from '../../functions/loading';


export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        let {data} = yield (new swagger.CategoryApi()).categoryListGet(select('user.token'), {
            def: true
        });

        dispatch(categoryListAction(data));
        next()
    } catch (error) {
        console.log('errors', error);
    }
});
