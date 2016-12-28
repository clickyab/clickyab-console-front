import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';
import {TextCell} from './TextCell';

export default class DataTable extends React.Component {
    setRows(items, definitions) {
        const {sort, filter, search, change, edit} = this.props;

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
                    cell={<TextCell
                        actions={columnDefinition.data == "_actions"}
                        change={change} edit={edit}
                        column={columnDefinition.data} items={items}
                    />}
                    flexGrow={1}
                    fixed={false} width={160} key={Math.random()}/>);
        }

        return _items;
    }

    addActionHeader(definitions) {
        return [...definitions, {
            data: '_actions',
            filter: false,
            filter_valid_map: null,
            searchable: false,
            sortable: false,
            title: "Action",
            name: "Action",
            visible: true
        }
        ];
    }

    render() {
        let {items, definitions} = this.props;
        definitions = this.addActionHeader(definitions);

        return (
            <Table rowHeight={50} rowsCount={items.length}
                   headerHeight={80} width={150 * definitions.length}
                   height={500} {...this.props}>
                {this.setRows(items, definitions)}
            </Table>
        );
    }
}

DataTable.propTypes = {
    items: React.PropTypes.array
};