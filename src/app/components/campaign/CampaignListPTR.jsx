import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class CampaignListPTR extends Component {
	render() {
		const {items, definitions} = this.props;

		return (
			<div className='page-content'>
				<DataTable items={items} definitions={definitions}/>
			</div>
		)
	}
}

CampaignListPTR.propTypes = {
    items: React.PropTypes.array
};
