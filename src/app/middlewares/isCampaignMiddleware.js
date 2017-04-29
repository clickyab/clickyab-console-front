import {throwError} from "../functions/Error";
import {navigate} from "../functions/navigate";
import checkCampaignId from "../functions/checkCampaignId";
import {dispatch} from "../functions/dispatch";
import {createCampaign} from "../redux/actions/index";
import {AlertBox} from "../functions/notifications";
import {select} from "../functions/select";

export function* isCampaignMiddleware(props) {
	let {error} = yield checkCampaignId(props);

	if (select("createCampaignData.admin_status") == 'accepted') {
		throwError('isCampaignMiddleware', function () {
			navigate('/v1/advertiser/campaign/');
			AlertBox("error", "کمپین شما تایید شده است و امکان ویرایش آن وجود ندارد");
		});

	}

	if (error || props.params.campaign_id === undefined) {
		throwError('isCampaignMiddleware', function () {
			dispatch(createCampaign({}));
			navigate('/v1/advertiser/campaign/');
			AlertBox("error", "این کمپین در سیسستم وجود ندارد");
		});
	}
}