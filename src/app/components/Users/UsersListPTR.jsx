import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class UsersListPTR extends Component {
	render() {
		const {items, definitions} = this.props;

		return (
			<div className='page-content'>
				<DataTable items={items} definitions={definitions}/>
			</div>
		)
	}
}

UsersListPTR.propTypes = {
    items: React.PropTypes.array
};
