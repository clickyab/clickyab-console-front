import React, {Component} from "react";
import {Table, Column, Cell} from 'fixed-data-table';

export default class HeaderCell extends Component {
    sortFlag = "ASC";

    search(event) {
        this.props.search(event);
    }

    filter(event) {
        this.props.filter(event);
    }

    sort(event) {
        event.preventDefault();
        event.stopPropagation();
        this.sortFlag = this.sortFlag == "ASC" ? "DSC" : "ASC";

        this.props.sort(this.sortFlag);
    }

    getFilters(filters) {
        let _filters = [];
        for (let keyFilter in filters) {
            _filters.push(<option key={keyFilter} value={keyFilter}>{filters[keyFilter]}</option>)
        }

        return _filters;
    }

    render() {
        let {filters, sortable, children, searchable, ...rest} = this.props;
        const {height, width, columnKey} = rest;
        return (
            <Cell {...{height, width, columnKey}}>
                {sortable ? <a href="#" onClick={this.sort.bind(this)}>{children}</a> : children}
                {searchable ? <input onChange={this.search.bind(this)} placeholder={"search by " + children}/> : ''}
                {filters !== null ? <select onChange={this.filter.bind(this)}>{this.getFilters(filters)}</select> : ''}
            </Cell>
        );
    }
}