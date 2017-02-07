import {throwError} from "../functions/Error";
import {navigate} from "../functions/navigate";
import checkCampaignId from "../functions/checkCampaignId";
import {dispatch} from "../functions/dispatch";
import {createCampaign} from "../redux/actions/index";
import {AlertBox} from "../functions/notifications";

export function* isCampaignMiddleware(props) {
    let {error} = yield checkCampaignId(props);

    if (error || props.params.campaign_id === undefined) {
        throwError('isCampaignMiddleware', function () {
            dispatch(createCampaign({}));
            navigate('/v1/advertiser/campaign/');
            AlertBox("error", "این کمپین در سیسستم وجود ندارد");
        });
    }
}