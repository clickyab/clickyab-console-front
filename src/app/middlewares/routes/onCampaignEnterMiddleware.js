import {sync} from '../../functions/sync';
// import {getToken} from '../../redux/helpers';
import * as swagger from '../../swagger/index';
import {channelListAction, campaignListAction} from '../../redux/actions/index';
import {dispatch} from '../../functions/dispatch';
import {select} from '../../functions/select';
import {loading} from '../../functions/loading';


export default (nextState, replace, next) => sync(function*() {
    try {
        loading(true);
        let {error, data, response} = yield (new swagger.CampaignApi()).campaignListGet(select('user.token'), {
            def: true
        });

        dispatch(campaignListAction(data));
        next()
    } catch (error) {
        console.log('errors', error);
    }
});
