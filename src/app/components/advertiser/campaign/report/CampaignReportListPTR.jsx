import React, {Component} from "react";
import {ConsoleTable} from "../../../common/ConsoleTable/ConsoleTable";
import {navigate} from "../../../../functions/navigate";
import {dispatch} from "../../../../functions/dispatch";
import {createCampaign} from "../../../../redux/actions/index";

export default class CampaignReportListPTR extends Component {
	componentDidMount() {
		document.title = "مدیریت کمپین ها";
		$(document).on("click", "#showAddCampaign", function () {
			dispatch(createCampaign({}));
			navigate('/v1/advertiser/campaign/create/step/name');
		})
	}

	render() {
		return (
			<div className='page-content'>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'> مدیریت کمپین‌ها</h1>
					</div>
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست کمپین ها</span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
										id="showAddCampaign">ساخت کمپین جدید
								</button>
							</div>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="campaignReport"/>
					</div>
				</div>
			</div>
		)
	}
}

CampaignReportListPTR.propTypes = {
	items: React.PropTypes.array
};
