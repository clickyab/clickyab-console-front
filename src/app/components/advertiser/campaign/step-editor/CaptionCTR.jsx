import React, {Component} from "react";
import CaptionPTR from "./CaptionPTR";
import swagger from "../../../../swagger/index";
import {sync} from "./../../../../functions/sync";
import {createCampaign, deleteCampaignPromote, updateLocalStorageAction} from "../../../../redux/actions/index";
import {dispatch} from "./../../../../functions/dispatch";
import {navigate} from "../../../../functions/navigate";
import {AlertBox} from "../../../../functions/notifications";
import {select} from "../../../../functions/select";
import {Base64} from "js-base64";
import $ from "jquery";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class CaptionCTR extends Component {
    componentDidMount() {
        let textarea_text = $(".emojieditor-plugin-content");
        $(document).on("click", ".caption-text-form-btn", function (e) {
            e.preventDefault();
            sync(function *() {
                loadingProgress = Ladda.create(document.querySelector('button.caption-text-form-btn'));
                loadingProgress.start();

                const {response} = yield (new swagger.AdApi())
                    .campaignDescIdPut(select("createCampaignData.id", "no id"), select("user.token", "no token"), {'payloadData': {"body": Base64.encode(textarea_text.val())}});

                if (response.statusCode === 200) {
                    dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {description: textarea_text.val()})));
                    dispatch(deleteCampaignPromote());
                    dispatch(updateLocalStorageAction());

                    loadingProgress.stop();

                    navigate('/v1/advertiser/campaign/create/:campaign_id:/step/plan', {
                        campaign_id: select('createCampaignData.id')
                    });
                } else if (response.statusCode === 400) {
                    loadingProgress.stop();
                    AlertBox("error", "لطفا یک متن وارد نمایید");
                }
            });
        });
    }

    render() {
        return (<CaptionPTR/>);
    }
}
