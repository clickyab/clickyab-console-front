import {sync} from '../../functions/sync';
// import * as swagger from '../../swagger/index';
// import { categoryListAction} from '../../redux/actions/index';
// import {dispatch} from '../../functions/dispatch';
// import {select} from '../../functions/select';
import {loading} from '../../functions/loading';


export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        // let {error, data, response} = yield (new swagger.CategoryApi()).channelListGet(select('user.token'), {
        //     def: true
        // });

        // dispatch(categoryListAction(data));
        // next()
    } catch (error) {
        console.log('errors', error);
    }
});
