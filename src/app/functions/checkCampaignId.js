import swagger from "../swagger/index";
import {select} from "./select";
import {sync} from "./sync";
import {dispatch} from "./dispatch";
import {createCampaign, updateLocalStorageAction} from "../redux/actions/index";

export default function checkCampaignId(props) {
    let campaignId = props.params.campaign_id;
    let result = {};
    sync(function*() {
         result = yield (new swagger.AdApi())
            .campaignGetIdGet(campaignId, select('user.token', 'no token'));
        dispatch(createCampaign(result.data));
        dispatch(updateLocalStorageAction());
    });

    return result;
}