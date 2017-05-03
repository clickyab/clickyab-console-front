import React, {Component} from "react";
import {ConsoleCell} from "./ConsoleCell";
import {InputCell} from "./ConsoleFooterCell";
import {dataTableLoader} from "./ConsoleTable";


export class Body extends Component {
    static defaultProps = {
        defaults: {},
        mutators: {}
    };

    rows() {
        let {items, defaults, headers} = this.props;
        let rows = [];
        const rowsCount = items.length;

        for (let i = 0; i < rowsCount; i++) {
            let cells = items[i];
            let row = [];
            for (let header of headers()) {
                row.push({
                    cell: Object.assign({}, cells, {
                        name: header.data,
                        data: cells[header.data] || defaults[header.data]
                    }),
                    header: header
                });
            }
            rows.push(row);
        }

        return rows;
    }

    inputs() {
        return this.props.definitions.filter(
            header => header.visible ? header : null
        );
    }

    inputCells() {
        let {sort, filter, list, search} = this.props;

        return this.inputs().map(
            (footer, index) => <InputCell
                key={index}
                loader={dataTableLoader}
                footer={footer}
                list={list}
                sort={sort}
                filter={filter}
                search={search}
                query_name={footer.data}
                filters={footer.filter_valid_map}
                sortable={footer.sortable}
                width={footer.width}
                searchable={footer.searchable}
            />
        );
    }

    cells(row, rowIndex) {
        let {change, edit, deleteAction, depositAction, mutators} = this.props;

        return row.map(
            ({cell, header}, index) => <ConsoleCell
                key={index}
                mutator={mutators[header.data]}
                actions={header.data === "_actions"}
                change={change} edit={edit}
                deleteAction={deleteAction}
                depositAction={depositAction}
                className="value-datatable"
                rowIndex={rowIndex} {...cell}
            />
        );
    }

    tableRows() {
        return this.rows().map((row, rowIndex) => {
            return (<tr key={rowIndex}>{this.cells(row, rowIndex)}</tr>);
        })
    }

    render() {
        return (
            <tbody>
            <tr className="search-line">{this.inputCells()}</tr>
            {this.tableRows()}
            </tbody>
        );
    }
}
