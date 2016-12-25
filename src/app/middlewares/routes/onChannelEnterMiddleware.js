import {sync} from "../../functions/sync";
import {getToken} from "../../redux/helpers";
import * as swagger from "../../swagger/index";


export default (nextState, replace, next) => sync(function*() {
    try {
        let {error, data, response} = yield (new swagger.ChannelApi()).channelListGet(getToken(), {
            def: true
        });

        next()
    } catch (error) {
        console.log('errors', error);
    }
});
