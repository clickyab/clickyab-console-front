import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class CampaignListPTR extends Component {
	render() {

		return (
			<div className='page-content'>
				<DataTable {...this.props}/>
			</div>
		)
	}
}

CampaignListPTR.propTypes = {
    items: React.PropTypes.array
};
