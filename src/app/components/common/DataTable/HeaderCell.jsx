import {Component} from "react";
import {Table, Column, Cell} from 'fixed-data-table';

export default class HeaderCell extends Component {
	search(event) {
		console.log(event.target.value);
	}

	render() {
		let {rowIndex, children, searchable, ...rest} = this.props;
		return (<Cell {...rest}>
			{children}
			{searchable ? <input onChange={this.search.bind(this)} placeholder="Filter by First Name"/> : ''}
		</Cell>);
	}
}