import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {channelListAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {throwError} from "../../functions/Error";
import {raceOnTime} from "../../functions/raceOnTime";
import ping from "../../functions/ping";

function* channelListController(done, next) {
    loading(true);
    const {error, data, response} = yield (new swagger.ChannelApi())
        .channelListGet(select('user.token'), {def: true});

    done();
    if (!error) {
        dispatch(channelListAction(data));

        next();
    } else {
        console.log(error);
        throwError("onChannelEnterMiddleWare", function () {
            console.log("failed")
        });
    }
}

export default (nextState, replace, next) => sync(function*() {
    try {
        raceOnTime(channelListController, next, function () {
            console.log('hallow');
        }, 20000);
    } catch (error) {
        if (error.recover)
            error.recover();
        else
            console.log(error);
    }
});
