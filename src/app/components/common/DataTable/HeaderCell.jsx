import React, {Component} from "react";
import {Table, Column, Cell} from 'fixed-data-table';

export default class HeaderCell extends Component {
    sortFlag = "ASC";

    sort(event, query_name) {
        event.preventDefault();
        event.stopPropagation();
        this.sortFlag = this.sortFlag == "ASC" ? "DESC" : "ASC";

        this.props.sort(this.sortFlag, query_name);
    }

    getFilters(filters) {
        let _filters = [];
        for (let keyFilter in filters) {
            _filters.push(<option key={keyFilter} value={keyFilter}>{filters[keyFilter]}</option>)
        }

        return _filters;
    }

    render() {
        let {filters, sortable, children, search, filter, query_name, searchable, ...rest} = this.props;
        const {height, width, columnKey} = rest;

        return (
            <Cell {...{height, width, columnKey}}>
                {sortable ? <a href="#" onClick={(event) => this.sort(event, query_name)}>{children}</a> : children}
                {searchable ?
                    <input className="form-control type-search-datatable" onChange={(event) => search(event, query_name)} placeholder={"search by " + children}/> : ''}
                {filters !== null ? <select className="form-control select-datatable"
                        onChange={(event) => filter(event, query_name)}>{this.getFilters(filters)}</select> : ''}
            </Cell>
        );
    }
}