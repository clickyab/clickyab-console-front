import React, {PropTypes} from "react";
import {ConsoleCell} from "./ConsoleCell";
import {InputCell} from "./InputCell";
import {dataTableLoader} from "./ConsoleTable";

function rows(props) {
    let {items, defaults, headers} = props;
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

function inputs(definitions) {
    return definitions.filter(
        header => header.visible ? header : null
    );
}

function inputCells(props) {
    let {sort, list, filter, search, definitions} = props;

    return inputs(definitions).map(
        (footer, index) => <InputCell
            key={index}
            loader={dataTableLoader}
            footer={footer}
            filter={filter}
            list={list}
            sort={sort}
            search={search}
            query_name={footer.data}
            filters={footer.filter_valid_map}
            sortable={footer.sortable}
            width={footer.width}
            searchable={footer.searchable}
        />
    );
}

function cells(row, rowIndex, props) {
    let {change, edit, deleteAction, depositAction, mutators} = props;

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

function tableRows(props) {
    let {items, defaults, headers, ...rest} = props;

    return rows({items, defaults, headers}).map((row, rowIndex) => {
        return (<tr key={rowIndex}>{cells(row, rowIndex, rest)}</tr>);
    })
}

export function Body(props) {
    return (
        <tbody>
        <tr className="search-line">{inputCells(props)}</tr>
        {tableRows(props)}
        </tbody>
    );
}

Body.defaultProps = {
    defaults: {},
    mutators: {},
};

Body.propTypes = {
    items: PropTypes.array,
    defaults: PropTypes.object,
    headers: PropTypes.func,
    change: PropTypes.func,
    edit: PropTypes.func,
    deleteAction: PropTypes.func,
    depositAction: PropTypes.func,
    mutators: PropTypes.object,
    sort: PropTypes.func,
    list: PropTypes.string,
    search: PropTypes.func,
    definitions: PropTypes.array
};