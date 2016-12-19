import {Table, Column, Cell} from "fixed-data-table";
import React from "react";

export default class DataTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rows: [],
			definitions: []
		};
	}

	setRows() {
		let {definitions} = this.state;
		let rows = [];
		let columnDefinition;
		for (let i = 0; i < definitions.length; i++) {
			columnDefinition = definitions[i];
			if (columnDefinition.visible)
				rows.push(<Column
					header={<HeaderCell searchable={columnDefinition.searchable}>
						{columnDefinition.name}
					</HeaderCell>}
					cell={<TextCell>{'jafar'}</TextCell>} fixed={true}
					width={100} key={Math.random()}/>);
		}

		return rows;
	}

	componentDidMount() {
		// api call
		this.setState({rows: this.setRows()});
	}

	render() {
		let {rows, definitions} = this.state;

		return (
			<Table rowHeight={50} rowsCount={2}
				   headerHeight={50} width={100 * definitions.length}
				   height={500} {...this.props}>
				{rows}
			</Table>
		);
	}
}