import React, {Component, PropTypes} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";
let $ = require("jquery");

export default class ChangeChannelArchiveStatus extends Component {
    handleChange(checked) {
        const {id} = this.props;

        $(".loader-table").fadeIn();

        sync(function*() {
            yield (new swagger.ChannelApi())
                .channelListArchiveStatusIdPut(id, getToken(), {
                    payloadData: {
                        "archive_status": checked ? 'yes' : 'no'
                    }
                });
        });

        $(".loader-table").fadeOut();
    }

    render() {
        let {archive_status, permission} = this.props;

        return (
            <Switch
                checked={archive_status === 'yes'}
                className='settingCell'
                disabled={permission}
                onChange={this.handleChange.bind(this)}
                value={archive_status}
            />
        )
    }
}

ChangeChannelArchiveStatus.propTypes = {
    id: PropTypes.number,
    permission: PropTypes.bool,
    archive_status: PropTypes.string
};