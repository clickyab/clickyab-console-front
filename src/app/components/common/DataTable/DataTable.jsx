import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';
import {TextCell} from './TextCell';

export default class DataTable extends React.Component {
    setRows() {
        const {sort, filter, search, items, definitions} = this.props;

        let _items = [];
        let columnDefinition;
        for (let i = 0; i < definitions.length; i++) {
            columnDefinition = definitions[i];
            if (columnDefinition.visible)
                _items.push(<Column
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
                    cell={<TextCell column={columnDefinition.data} items={items}/>}
                    fixed={true} width={160} key={Math.random()}/>);
        }

        return _items;
    }

    render() {
        let {items, definitions} = this.props;

        console.log("oHHHHHHHHHHHHo");
        console.log(items, definitions);
        console.log("oHHHHHHHHHHHHo");
        return (
            <Table rowHeight={50} rowsCount={items.length}
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