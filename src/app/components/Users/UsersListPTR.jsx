import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class UsersListPTR extends Component {
	render() {
		return (
			<div className='page-content'>
				<DataTable {...this.props}/>
			</div>
		)
	}
}

UsersListPTR.propTypes = {
	items: React.PropTypes.array
};
