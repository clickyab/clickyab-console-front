import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';

const TextCell = ({rowIndex, column, rows, ...props}) => {
    return (<Cell {...props}>
        {rows[rowIndex][column]}
    </Cell>);
};

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: props.items,
            definitions: props.definitions
        };
    }

    setRows() {
        let {rows, definitions} = this.state;

        let _rows = [];
        let columnDefinition;
        for (let i = 0; i < definitions.length; i++) {
            columnDefinition = definitions[i];
            console.log(columnDefinition.data);
            if (columnDefinition.visible)
                _rows.push(<Column
                    header={<HeaderCell searchable={columnDefinition.searchable}>
                        {columnDefinition.name}
                    </HeaderCell>}
                    cell={<TextCell column={columnDefinition.data} rows={rows}/>}
                    fixed={true} width={160} key={Math.random()}/>);
        }

        return _rows;
    }

    render() {
        let {rows, definitions} = this.state;

        return (
            <Table rowHeight={50} rowsCount={rows.length}
                   headerHeight={50} width={100 * definitions.length}
                   height={500} {...this.props}>
                {this.setRows()}
            </Table>
        );
    }
}

DataTable.propTypes = {
    items: React.PropTypes.array
};