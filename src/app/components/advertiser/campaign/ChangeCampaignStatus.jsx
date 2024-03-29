import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
let selectpicker = require("bootstrap-select/dist/js/bootstrap-select");

export default class ChangeCampaignStatus extends Component {

	edit(event) {
		const {id} = this.props;
		sync(function*() {
			const {response} = yield (new swagger.AdApi())
				.campaignListAdminStatusIdPut(id, getToken(), {
					payloadData: {
						"admin_status": event.target.value
					}
				});
		});
	}

	render() {
		let {translator, admin_status} = this.props;
		return <select key={Math.random()} className="form-control input-sm" name="status" defaultValue={admin_status}
					   onChange={this.edit.bind(this)}>
			<option data-tokens="accepted" value="accepted">{translator('accepted')}</option>
			<option data-tokens="pending" value="pending">{translator('pending')}</option>
			<option data-tokens="rejected" value="rejected">{translator('rejected')}</option>
		</select>
	}
}