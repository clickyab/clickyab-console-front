import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';
import {navigate} from "../../functions/navigate";

export default class CampaignListPTR extends Component {
	componentDidMount() {
        document.title = "مدیریت کمپین ها";
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
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست کمپین ها</span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button  className="btn btn-transparent blue btn-outline btn-circle btn-sm" id="showAddCampaign" >ساخت کمپین جدید
								</button>
							</div>
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
