import React, {Component} from "react";
import CaptionPTR from "./CaptionPTR";
import swagger from "../../../../swagger/index";
import {sync} from "./../../../../functions/sync";
import {createCampaign, updateLocalStorageAction, deleteCampaignPromote} from "../../../../redux/actions/index";
import {dispatch} from "./../../../../functions/dispatch";
import {navigate} from "../../../../functions/navigate";
import {AlertBox} from "../../../../functions/notifications";
import {select} from "../../../../functions/select";
import $ from "jquery";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class CaptionCTR extends Component {
    componentDidMount() {
        let textarea_text = $(".emojieditor-plugin-content");
        $(document).on("click", ".caption-text-form-btn", function (e) {
            e.preventDefault();
            if ($.trim($(".emojionearea-editor").text()) != '') {
                sync(function *() {
                    loadingProgress = Ladda.create(document.querySelector('button.caption-text-form-btn'));
                    loadingProgress.start();

                    const {response} = yield (new swagger.AdApi())
                        .campaignDescIdPut(select("createCampaignData.id", "no id"), select("user.token", "no token"), {'payloadData': {"body": textarea_text.val()}});

                    response.error = 'اطلاعات شما صحیح نمی‌باشد.';
                    response.text = 'اطلاعات شما با موفقیت ثبت شد.';
                    if (response.statusCode == '200') {
                        dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {description: textarea_text.val()})));
                        dispatch(deleteCampaignPromote());
                        dispatch(updateLocalStorageAction());

                        loadingProgress.stop();
                        AlertBox("success", "کپشن با موفقیت افزوده شد، هم اکنون پلن تبلیغاتی خود را انتخاب کنید");

                        navigate('/v1/advertiser/campaign/create/:campaign_id:/step/plan', {
                            campaign_id: select('createCampaignData.id')
                        });
                    } else if (response.statusCode == '400') {
                        loadingProgress.stop();
                        AlertBox("error", "لطفا یک متن وارد نمایید");
                    }
                });
            } else {
                AlertBox("error", "لطفا یک متن وارد نمایید");
            }
        });
    }

    render() {
        return (<CaptionPTR />);
    }
}
