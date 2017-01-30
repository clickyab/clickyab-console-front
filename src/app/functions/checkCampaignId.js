import swagger from '../swagger/index';
import {select} from './select';

export default function checkCampaignId(props) {
    let campaignId = props.params.campaign_id;
    return new swagger.AdApi().campaignIdGet(campaignId,select('user.token', 'no token'));
}//