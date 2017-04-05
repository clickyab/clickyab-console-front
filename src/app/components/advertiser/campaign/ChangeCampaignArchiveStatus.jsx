import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";

export default class ChangeCampaignArchiveStatus extends Component {
	handleChange(checked) {
		const {id} = this.props;
		$(".loader-table").fadeIn();
		sync(function*() {
			const {response} = yield (new swagger.AdApi())
				.campaignListArchiveStatusIdPut(id, getToken(), {
					payloadData: {
						"archive_status": checked ? 'yes' : 'no'
					}
				});
		});
		$(".loader-table").fadeOut();
	}

	render() {
		let {archive_status} = this.props;

		return <Switch
			checked={archive_status === 'yes'}
			className='settingCell'
			onChange={this.handleChange.bind(this)}
			value={archive_status}
		/>
	}
}