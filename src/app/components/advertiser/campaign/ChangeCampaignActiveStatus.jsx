import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";

export default class ChangeCampaignActiveStatus extends Component {
    edit() {
        const {id} = this.props;
        sync(function*() {
            const {response} = yield (new swagger.AdApi())
                .campaignListActiveStatusIdPut(id, getToken(), {
                    payloadData: {
                        "active_status": event.target.value
                    }
                });

        });
    }

    render() {
        let {translator, active} = this.props;
        return <select className="form-control input-sm" name="active" defaultValue={active} onChange={this.edit.bind(this)}>
            <option value="yes">{translator('yes')}</option>
            <option value="no">{translator('no')}</option>
        </select>
    }
}