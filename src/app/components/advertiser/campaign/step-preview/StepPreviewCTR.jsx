import React, {Component} from "react";
import StepPreviewPTR from "./StepPreviewPTR";
import {connect} from "react-redux";
import moment from "moment-jalali";

@connect(({createCampaignData}) => ({createCampaignData}))
export default class StepPreviewCTR extends Component {
	created_at(created_at) {
		return moment(created_at).format('dddd، jD jMMMM jYYYY');
	}

	render() {
		return (<StepPreviewPTR created_at={this.created_at} data={this.props.createCampaignData}/>)
	}
}