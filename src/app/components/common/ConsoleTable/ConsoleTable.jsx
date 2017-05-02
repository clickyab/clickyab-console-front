import React, {Component} from "react";
import {ConsoleHeaderCell} from "./ConsoleHeaderCell";
import {ConsoleCell} from "./ConsoleCell";
import {ConsoleFooterCell} from "./ConsoleFooterCell";
import {select} from "../../../functions/select";
import {translate, translateViaHtml} from "../../../functions/translate";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";

export class ConsoleTable extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        defaults: {},
        mutators: {}
    };

    componentDidMount() {
        $(document).on("click", "[data-column]", function () {
            var button = $(this),
                header = $(button.data("column")),
                table = header.closest("table"),
                index = header.index() + 1, // convert to CSS's 1-based indexing
                selector = "tbody tr td:nth-child(" + index + ")",
                column = table.find(selector).add(header);

            column.toggleClass("hidden");
        });
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

        this.loader(true);
        onPaginationChange(page);
        this.loader(false);
    }

    onPerPageChange(per_page) {
        let {onPerPageChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, 'c', per_page));
        dispatch(updateLocalStorageAction());

        this.loader(true);
        onPerPageChange(per_page);
        this.loader(false);
    }


    pagination() {
        const per_page = select('queries.' + this.props.list + '.c', 10);
        let pages_count = Math.floor(this.props.total / per_page);
        if (pages_count == 0) {
            pages_count = 1;
        } else if(this.props.total % per_page != 0) {
            pages_count += 1;
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
        let {sort, filter, list, change, edit, deleteAction, depositAction, search, mutators} = this.props;

        return (
            <div className="table-holder">
                <div className="loader-table" style={{display: 'none'}}>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
                </div>
                <div id="show-hide-action-btns"/>

                <div className="table-responsive">
                    <table className="table table-striped table-advance table-hover">
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
                                    {translate(header.name)}
                                </ConsoleHeaderCell>
                            )}
                        </tr>

                        </thead>

                        <tbody>
                        <tr className="search-line">
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
                                    searchable={footer.searchable}
                                />
                            )}
                        </tr>
                        {this.rows().map((row, rowIndex) => {
                            return (<tr key={rowIndex}>
                                {row.map(
                                    ({cell, header}, index) => <ConsoleCell key={index}
                                                                            mutator={mutators[header.data]}
                                                                            actions={header.data == "_actions"}
                                                                            change={change} edit={edit} deleteAction={deleteAction}
                                                                            depositAction={depositAction}
                                                                            className="value-datatable"
                                                                            rowIndex={rowIndex} {...cell}/>
                                )}
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="row margin-top-20">
                    <div className="col-sm-6 col-xs-12">
                        <div className="dataTables_length pagination">
                            <label>{translate("View page")}
                                <select key={Math.random()}
                                        className="form-control input-sm input-xsmall input-inline text-center"
                                        defaultValue={select('queries.' + list + '.p', 1)} onChange={(event) => {
                                    this.onPaginationChange(parseInt(event.target.value));
                                }}>
                                    {this.pagination()}
                                </select>
                                {translateViaHtml("from %s page", `<span class="bold">${this.pagination().length}</span>`)}
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="dataTables_length pull-left">
                            <label>{translate("Show")}
                                <select key={Math.random()}
                                        className="form-control input-sm input-xsmall input-inline text-center"
                                        onChange={(event) => {
                                            this.onPerPageChange(parseInt(event.target.value));
                                            dispatch(channelQueryAction(list, 'p', 1));
                                        }}
                                        defaultValue={select('queries.' + list + '.c', 10)}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                                {translateViaHtml("In the queue of %s", `<span
                                     class="bold">${select(this.props.list + 'List.items').length}</span>`)}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
