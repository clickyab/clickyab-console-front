import React, {Component} from "react";
import {ConsoleHeaderCell} from "./ConsoleHeaderCell";
import {ConsoleCell} from "./ConsoleCell";
import {InputCell} from "./ConsoleFooterCell";
import {translate} from "../../../functions/translate";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";
import {Pagination} from "./Pagination";
import {PerPage} from "./PerPage";

export function dataTableLoader(status) {
    if (status === true) {
        $(".loader-table").fadeIn();
    }
    else {
        $(".loader-table").fadeOut();
    }
}

export class ConsoleTable extends Component {
    constructor(props) {
        super(props);

        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onPerPageChange = this.onPerPageChange.bind(this);
    }

    static defaultProps = {
        defaults: {},
        mutators: {}
    };

    rows() {
        let {items, defaults} = this.props;
        let rows = [];
        const rowsCount = items.length;

        for (let i = 0; i < rowsCount; i++) {
            let cells = items[i];
            let row = [];
            for (let header of this.headers()) {
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

    headers() {
        let headers = this.props.definitions.filter(
            header => header.visible ? header : null
        );

        return this.addActionHeader(headers);
    }

    onPaginationChange(event) {
        const page = event.target.value;
        let {onPaginationChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', page));
        dispatch(updateLocalStorageAction());

        dataTableLoader(true);
        onPaginationChange(page);
        dataTableLoader(false);
    }

    onPerPageChange(event) {
        const per_page = event.target.value;
        let {onPerPageChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, 'c', per_page));
        dispatch(updateLocalStorageAction());

        dataTableLoader(true);
        onPerPageChange(per_page);
        dataTableLoader(false);

        dispatch(channelQueryAction(list, 'p', 1));
    }

    addActionHeader(headers) {
        if (this.props.action === false)
            return headers;

        return [...headers, {
            width: 150,
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

    headerCells() {
        let {sort, filter, list} = this.props;

        return this.headers().map(
            (header, index) => <ConsoleHeaderCell
                key={index}
                list={list}
                loader={dataTableLoader}
                sort={sort}
                filter={filter}
                query_name={header.data}
                filters={header.filter_valid_map}
                sortable={header.sortable}
                width={header.width}
                searchable={header.searchable}
            >
                {translate(header.name)}
            </ConsoleHeaderCell>
        )
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
        let {list, total} = this.props;

        return (
            <div className="table-holder">
                <div className="loader-table" style={{display: 'none'}}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
                </div>
                <div id="show-hide-action-btns"/>

                <div className="table-responsive">
                    <table className="table table-striped table-advance table-hover">
                        <thead>
                        <tr>{this.headerCells()}</tr>
                        </thead>
                        <tbody>
                        <tr className="search-line">{this.inputCells()}</tr>
                        {this.tableRows()}
                        </tbody>
                    </table>
                </div>
                <div className="row margin-top-20">
                    <Pagination list={list} total={total} onPaginationChange={this.onPaginationChange}/>
                    <PerPage list={list} onPerPageChange={this.onPerPageChange}/>
                </div>
            </div>
        );
    }
}

