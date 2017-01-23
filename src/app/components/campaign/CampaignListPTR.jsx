import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';
import {navigate} from "../../functions/navigate";

export default class CampaignListPTR extends Component {
	componentDidMount() {
		$(document).on("click", "#showAddCampaign", function () {
			navigate('/v1/campaign/create/step/name');
		})
	}

	render() {
		return (
			<div className='page-content'>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'> مدیریت کمپین‌ها</h1>
					</div>
					<div className='top-action-header'>
						<button className="btn btn-lg blue pull-left" id="showAddCampaign">
							<i className="fa fa-plus"/> ساخت کمپین‌ جدید
						</button>
					</div>
				</div>
				<div className='portlet light datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>کمپین ها </span>
						</div>
					</div>
					<div className='portlet-body'>
						<DataTable {...this.props} list="campaign"/>
					</div>
				</div>
			</div>
		)
	}
}

CampaignListPTR.propTypes = {
    items: React.PropTypes.array
};
