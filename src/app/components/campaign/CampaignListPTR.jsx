import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class CampaignListPTR extends Component {
	render() {

		return (
			<div className='page-content'>
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
