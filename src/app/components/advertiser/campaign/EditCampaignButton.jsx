import React from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {createCampaign} from "../../../redux/actions/index";
import {sync} from "../../../functions/sync";
import {AlertBox} from "../../../functions/notifications";
import {dispatch} from "../../../functions/dispatch";
import {navigate} from "../../../functions/navigate";
import {getToken} from "../../../redux/helpers";

function edit(event) {
    event.preserve();
    $(event.target).addClass("disabled");
    const id = event.target.attributes.getNamedItem('data-id').value;
    sync(function*() {
        const {error, data, response} = yield (new swagger.AdApi())
            .campaignGetIdGet(id, getToken());
        if (response.statusCode === 200) {
            $(event.target).removeClass("disabled");
            dispatch(createCampaign(data));
            navigate('/v1/advertiser/campaign/create/:campaign_id:/step/name', {
                campaign_id: select('createCampaignData.id')
            });
        } else if (response.statusCode === 400) {
            $(event.target).removeClass("disabled");
            AlertBox("error", "اختلالی به وجود امده است لطفا دوباره تلاش کنید")
        }
    });
}

export default function EditCampaignButton({id}) {
    return (<div className="btn-group ">
        <button className="btn btn-info btn-xs edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                key="edit" onClick={edit} data-id={id}>ویرایش
        </button>
    </div>);
}