import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';
import {TextCell} from './TextCell';

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
        const {sort, filter, search} = this.props;

        let _rows = [];
        let columnDefinition;
        for (let i = 0; i < definitions.length; i++) {
            columnDefinition = definitions[i];
            if (columnDefinition.visible)
                _rows.push(<Column
                    header={
                        <HeaderCell
                            sort={sort}
                            filter={filter}
                            search={search}
                            query_name={columnDefinition.data}
                            filters={columnDefinition.filter_valid_map}
                            sortable={columnDefinition.sortable}
                            searchable={columnDefinition.searchable}>
                            {columnDefinition.name}
                        </HeaderCell>
                    }
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