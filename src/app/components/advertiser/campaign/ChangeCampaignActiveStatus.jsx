import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import Switch from "./../../common/form/Switch";

export default class ChangeCampaignActiveStatus extends Component {
	handleChange(checked) {
		const {id} = this.props;
		$(".loader-table").fadeIn();
		sync(function*() {
			const {response} = yield (new swagger.AdApi())
				.campaignListActiveStatusIdPut(id, getToken(), {
					payloadData: {
						"active_status": checked ? 'yes' : 'no'
					}
				});

		});
		$(".loader-table").fadeOut();
	}

	render() {
		let {active} = this.props;

		return <Switch
			checked={active === 'yes'}
			className='settingCell'
			onChange={this.handleChange.bind(this)}
			value={active}
		/>
	}
}