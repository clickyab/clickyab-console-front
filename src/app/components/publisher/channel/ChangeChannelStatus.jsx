import React, {Component, PropTypes} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {translate} from "../../../functions/translate";
import {getToken} from "../../../redux/helpers";
let $ = require('jquery');

export default class ChangeChannelStatus extends Component {
    edit(event) {
        const {id} = this.props;
        sync(function*() {
            $(".loader-table").fadeIn();
            yield (new swagger.ChannelApi())
                .channelListAdminStatusIdPut(id, getToken(), {
                    payloadData: {
                        "status": event.target.value
                    }
                });
            $(".loader-table").fadeOut();
        });
    }

    render() {
        let {admin_status} = this.props;

        return (
            <select key={Math.random()} className="form-control" name="status" defaultValue={admin_status}
                    onChange={this.edit.bind(this)}>
                <option value="accepted">{translate('accepted')}</option>
                <option value="pending">{translate('pending')}</option>
                <option value="rejected">{translate('rejected')}</option>
            </select>
        )
    }
}

ChangeChannelStatus.propTypes = {
    admin_status: PropTypes.string,
    id: PropTypes.number
};