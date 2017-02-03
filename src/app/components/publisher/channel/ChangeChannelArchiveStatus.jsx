import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {ifInvalidToken} from "../../../functions/helpers";
import {getToken} from "../../../redux/helpers";

export default class ChangeChannelArchiveStatus extends Component {
	edit(event) {
		const {id} = this.props;
		sync(function*() {
			const {response} = yield (new swagger.ChannelApi())
				.channelChangeArchiveIdPut(id, getToken());

			ifInvalidToken(response);
		});
	}

	render() {
		let {translator, archive_status} = this.props;
		return <select name="archive" value={archive_status} onChange={this.edit.bind(this)}>
			<option value="yes">{translator('yes')}</option>
			<option value="no">{translator('no')}</option>
		</select>
	}
}