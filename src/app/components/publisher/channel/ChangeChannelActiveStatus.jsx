import React, {Component, PropTypes} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";
let $ = require("jquery");

export default class ChangeChannelActiveStatus extends Component {
    handleChange(checked) {
        const {id} = this.props;
        $(".loader-table").fadeIn();
        sync(function*() {
            yield (new swagger.ChannelApi())
                .channelListActiveStatusIdPut(id, getToken(), {
                    payloadData: {
                        "active_status": checked ? 'yes' : 'no'
                    }
                });
        });
        $(".loader-table").fadeOut();
    }

    render() {
        let {permission, active} = this.props;

        return (
            <Switch
                checked={active === 'yes'}
                className='settingCell'
                disabled={permission}
                onChange={this.handleChange.bind(this)}
                value={active}
            />
        )
    }
}

ChangeChannelActiveStatus.propTypes = {
    id: PropTypes.number,
    permission: PropTypes.bool,
    active: PropTypes.string
};