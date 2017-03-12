import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";

export default class ChangeChannelStatus extends Component {
    edit(event) {
        const {id} = this.props;
        sync(function*() {
            $(".loader-table").fadeIn();
            const {response} = yield (new swagger.ChannelApi())
                .channelListAdminStatusIdPut(id, getToken(), {
                    payloadData: {
                        "status": event.target.value
                    }
                });
            $(".loader-table").fadeOut();
        });
    }

    render() {
        let {translator, admin_status} = this.props;

        return <select key={Math.random()} className="form-control" name="status" defaultValue={admin_status}
                       onChange={this.edit.bind(this)}>
            <option value="accepted">{translator('accepted')}</option>
            <option value="pending">{translator('pending')}</option>
            <option value="rejected">{translator('rejected')}</option>
        </select>
    }
}