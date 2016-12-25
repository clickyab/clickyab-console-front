import {sync} from "../../functions/sync";
import {getToken} from "../../redux/helpers";
import * as swagger from "../../swagger/index";
import {channelListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";


export default (nextState, replace, next) => sync(function*() {
    try {
        let {error, data, response} = yield (new swagger.ChannelApi()).channelListGet(select('user.token'), {
            def: true
        });

        dispatch(channelListAction(data));
        next()
    } catch (error) {
        console.log('errors', error);
    }
});
