import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";

export default class ChangeChannelActiveStatus extends Component {
    edit(event) {
        const {id} = this.props;
        sync(function*() {
            $(".loader-table").fadeIn();
            const {response} = yield (new swagger.ChannelApi())
                .channelListActiveStatusIdPut(id, getToken(), {
                    payloadData: {
                        "active_status": event.target.value
                    }
                });
            $(".loader-table").fadeOut();
        });
    }

    render() {
        let {translator, active} = this.props;
        return <select className="form-control" name="active" defaultValue={active} onChange={this.edit.bind(this)}>
            <option value="yes">{translator('yes')}</option>
            <option value="no">{translator('no')}</option>
        </select>
    }
}