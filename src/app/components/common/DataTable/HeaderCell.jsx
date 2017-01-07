import React, {Component} from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction} from "../../../redux/actions/index";

export default class HeaderCell extends Component {
    sortFlag = "ASC";

    sort(event, query_name) {
        event.preventDefault();
        event.stopPropagation();
        this.sortFlag = this.sortFlag == "ASC" ? "DESC" : "ASC";

        this.props.sort(this.sortFlag, query_name);
    }

    sortOnChange(event) {
        let {list, query_name} = this.props;

        dispatch(channelQueryAction(list, {[query_name]: event.target.value}));

        this.sort(event, this.props.query_name);
    }

    onSearchChange(event) {
        let {list, query_name, search} = this.props;

        dispatch(channelQueryAction(list, {[query_name]: event.target.value}));

        search(event, query_name)
    }

    getFilters(filters) {
        let _filters = [];
        for (let keyFilter in filters) {
            _filters.push(<option key={keyFilter} value={keyFilter}>{filters[keyFilter]}</option>)
        }

        return _filters;
    }

    filterOnChange(event) {
        let {query_name, list, filter} = this.props;

        dispatch(channelQueryAction(list, {[query_name]: event.target.value}));

        filter(event, query_name);
    }

    render() {
        let {filters, sortable, children, search, query_name, searchable, ...rest} = this.props;
        const {height, width, columnKey} = rest;
        return (
            <Cell {...{height, width, columnKey}}>
                <span className="head-title-datatable">{sortable ?
                    <a href="#" onClick={this.sortOnChange.bind(this)}>{children}</a> : children}</span>
                <div className="search-filter-datatable">
                    {searchable ?
                        <input className="form-control type-search-datatable"
                               onChange={this.onSearchChange.bind(this)}
                               placeholder={"search by " + children}/> : ''}
                    {filters !== null ? <select className="form-control select-datatable"
                                                onChange={this.filterOnChange.bind(this)}>
                            {this.getFilters(filters)}</select> : ''}
                </div>
            </Cell>
        );
    }
}