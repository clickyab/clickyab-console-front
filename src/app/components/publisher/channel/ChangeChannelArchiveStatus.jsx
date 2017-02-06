import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {ifInvalidToken} from "../../../functions/helpers";
import {getToken} from "../../../redux/helpers";

export default class ChangeChannelArchiveStatus extends Component {
	edit(event) {
		const {id} = this.props;
		sync(function*() {
            $(".loader-table").fadeIn();
			const {response} = yield (new swagger.ChannelApi())
                .channelListArchiveStatusIdPut(id, getToken(), {payloadData: {
                    "archive_status": event.target.value
                }});
            $(".loader-table").fadeOut();
		});
	}

	render() {
		let {translator, archive_status} = this.props;
		return <select className="form-control" name="archive" defaultValue={archive_status} onChange={this.edit.bind(this)}>
			<option value="yes">{translator('yes')}</option>
			<option value="no">{translator('no')}</option>
		</select>
	}
}