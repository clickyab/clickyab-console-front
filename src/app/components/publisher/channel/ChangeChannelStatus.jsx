import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {ifInvalidToken} from "../../../functions/helpers";
import {getToken} from "../../../redux/helpers";

export default class ChangeChannelStatus extends Component {
	edit(event) {
		const {id} = this.props;
		sync(function*() {
			const {response} = yield (new swagger.ChannelApi())
				.channelStatusIdPut(id, getToken(), {payloadData: {id}});
			ifInvalidToken(response);
		});
	}

	render() {
		let {translator, admin_status} = this.props;
		return <select name="status" value={admin_status} onChange={this.edit.bind(this)}>
			<option value="accepted">{translator('accepted')}</option>
			<option value="pending">{translator('pending')}</option>
			<option value="rejected">{translator('rejected')}</option>
		</select>
	}
}