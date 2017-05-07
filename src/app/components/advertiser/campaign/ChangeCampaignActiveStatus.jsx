import React from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";

function handleChange(checked) {
    $(".loader-table").fadeIn();
    sync(function*() {
        yield (new swagger.AdApi())
            .campaignListActiveStatusIdPut(this.id, getToken(), {
                payloadData: {
                    "active_status": checked ? 'yes' : 'no'
                }
            });
    });
    $(".loader-table").fadeOut();
}

export default function ChangeCampaignActiveStatus({active, id}) {
    return <Switch
        checked={active === 'yes'}
        className='settingCell'
        id={id}
        onChange={handleChange}
        value={active + '-' + id}
    />
}