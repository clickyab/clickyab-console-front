import React, {Component} from "react";
import StepPreviewPTR from "./StepPreviewPTR";
import {connect} from "react-redux";
import moment from "moment-jalali";
import swagger from "../../../../swagger/index";
import {sync} from "../../../../functions/sync";
import {select} from "../../../../functions/select";
import {navigate} from "../../../../functions/navigate";
import {AlertBox} from "../../../../functions/notifications";
let Ladda = require('ladda/js/ladda');

@connect(({createCampaignData}) => ({createCampaignData}))
export default class StepPreviewCTR extends Component {
	loadingProgressSend;
	created_at(created_at) {
		return moment(created_at).format('dddd، jD jMMMM jYYYY');
	}

	requestToBank() {
		sync(function*() {
			console.log('hereee');
			this.loadingProgressSend = Ladda.create(document.querySelector('button.pay-button'));
			this.loadingProgressSend.start();
			let {data, response} = yield (new swagger.AdApi())
				.campaignPayAdIdGet(select('createCampaignData.id'), select('user.token', 'no token'));

			if (response.status == '200') {
				window.location = data;
			} else if (response.statusCode == '400') {
				AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید");
				this.loadingProgressSend.stop();
			}


		}.bind(this));
	}

	render() {
		return (<StepPreviewPTR requestToBank={this.requestToBank.bind(this)} created_at={this.created_at} data={this.props.createCampaignData}/>)
	}
}