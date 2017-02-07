import React, {Component} from "react";
import {ConsoleHeaderCell} from "./ConsoleHeaderCell";
import {ConsoleCell} from "./ConsoleCell";
import {ConsoleFooterCell} from "./ConsoleFooterCell";
import {select} from "../../../functions/select";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";

export class ConsoleTable extends Component {
    constructor(props) {
        super(props);
    }

    loader(status) {
        if (status == true) {
            $(".loader-table").fadeIn();
        }
        else {
            $(".loader-table").fadeOut();
        }
    }

    rows() {
        let {items} = this.props;
        let rows = [];
        const rowsCount = items.length;

        for (let i = 0; i < rowsCount; i++) {
            let cells = items[i];
            let row = [];
            for (let header of this.headers()) {
                row.push({
                    cell: Object.assign({}, cells, {name: header.data, data: cells[header.data]}),
                    header: header
                });
            }
            rows.push(row);
        }

        return rows;
    }

    footers() {
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

    onPaginationChange(page) {
        let {onPaginationChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', page));
        dispatch(updateLocalStorageAction());

        onPaginationChange(page);
    }

    onPerPageChange(per_page) {
        let {onPerPageChange, list} = this.props;

        dispatch(channelQueryAction(list, 'c', per_page));
        dispatch(updateLocalStorageAction());

        onPerPageChange(per_page);
    }


    pagination() {
        const per_page = select('queries.' + this.props.list + '.c', 10);
        let pages_count = Math.floor(this.props.total / per_page);
        if (pages_count == 0) {
            pages_count = 1;
        }

        let pages = [];
        for (let i = 0; i < pages_count; i++) {
            pages.push(<option key={i}>{i + 1}</option>);
        }

        return pages;
    }

    addActionHeader(headers) {
        if (this.props.action == false)
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

    render() {
        let {sort, filter, list, change, edit, search, mutators, translator} = this.props;
        if (!mutators) {
            mutators = {};
        }
        return (
            <div className="table-holder">
                <div className="loader-table" style={{display: 'none'}}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-advance table-hover">
                        <thead>
                        <tr>
                            {this.headers().map(
                                (header, index) => <ConsoleHeaderCell
                                    key={index}
                                    list={list}
                                    loader={this.loader.bind(this)}
                                    sort={sort}
                                    filter={filter}
                                    query_name={header.data}
                                    filters={header.filter_valid_map}
                                    sortable={header.sortable}
                                    width={header.width}
                                    searchable={header.searchable}
                                >
                                    {translator(header.name)}
                                </ConsoleHeaderCell>
                            )}
                        </tr>
                        </thead>

                        <tbody>
                        {this.rows().map((row, rowIndex) => {
                            return (<tr key={rowIndex}>
                                {row.map(
                                    ({cell, header}, index) => <ConsoleCell key={index}
                                                                            mutator={mutators[header.data]}
                                                                            actions={header.data == "_actions"}
                                                                            change={change} edit={edit}
                                                                            className="value-datatable"
                                                                            rowIndex={rowIndex} {...cell}/>
                                )}
                            </tr>)
                        })}
                        </tbody>

                        <tfoot>
                        <tr>
                            {this.footers().map(
                                (footer, index) => <ConsoleFooterCell
                                    key={index}
                                    loader={this.loader.bind(this)}
                                    footer={footer}
                                    list={list}
                                    sort={sort}
                                    filter={filter}
                                    search={search}
                                    query_name={footer.data}
                                    filters={footer.filter_valid_map}
                                    sortable={footer.sortable}
                                    width={footer.width}
                                    translator={translator}
                                    searchable={footer.searchable}
                                />
                            )}
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="row margin-top-20">
                    <div className="col-sm-6 col-xs-12">
                        <div className="dataTables_length pagination">
                            <label>نمایش صفحه
                                <select className="form-control input-sm input-xsmall input-inline text-center"
                                        defaultValue={select('queries.' + list + '.p', 1)} onChange={(event) => {
                                    this.onPaginationChange(parseInt(event.target.value));
                                }}>
                                    {this.pagination()}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="dataTables_length pull-left">
                            <label>نمایش
                                <input className="form-control input-sm input-xsmall input-inline text-center"
                                       type="text" onChange={(event) => {
                                    this.onPerPageChange(parseInt(event.target.value))
                                }} defaultValue={select('queries.' + list + '.c', 10)}/>
                                در صفحه
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
