import React from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";

function handleChange(checked) {
    $(".loader-table").fadeIn();
    sync(function*() {
        yield (new swagger.AdApi())
            .campaignListArchiveStatusIdPut(this.id, getToken(), {
                payloadData: {"archive_status": checked ? 'yes' : 'no'}
            });
    });
    $(".loader-table").fadeOut();
}

export default function ChangeCampaignArchiveStatus({id, archive_status}) {
    return <Switch
        id={id}
        checked={archive_status === 'yes'}
        className='settingCell'
        onChange={handleChange}
        value={archive_status}
    />
}