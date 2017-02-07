import React, {Component} from "react";
import {Table, Column, Cell} from "fixed-data-table";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";

export default class HeaderCell extends Component {

    sort(event, order, query_name) {
        event.preventDefault();
        event.stopPropagation();

        this.props.sort(order, query_name);
    }

    toggleSort(currentSort) {
        return currentSort.indexOf("ASC") >= 0 ? "DESC" : "ASC";
    }

    sortOnChange(event) {
        let {list, query_name} = this.props;

        let order = this.toggleSort(select('queries.' + list + '.sort', 'ASC'));

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, 'sort', query_name + ":" + order));
        dispatch(updateLocalStorageAction());

        this.sort(event, order, query_name);
    }

    onSearchChange(event) {
        let {list, query_name, search} = this.props;

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, query_name, event.target.value));
        dispatch(updateLocalStorageAction());

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

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, query_name, event.target.value));
        dispatch(updateLocalStorageAction());

        filter(event, query_name);
    }

    render() {
        let {filters, sortable, children, search, query_name, list, searchable, ...rest} = this.props;
        const {height, width, columnKey} = rest;
        return (

            <Cell {...{height, width, columnKey}}>
                <span className="head-title-datatable">{sortable ?
                    <a href="#" onClick={this.sortOnChange.bind(this)}>{children}</a> : children}</span>
                <div className="search-filter-datatable">
                    {searchable ?
                        <input className="form-control type-search-datatable"
                               onChange={this.onSearchChange.bind(this)}
                               defaultValue={select('queries.' + list + "." + query_name, '')}
                               placeholder={"search by " + children}/> : ''}
                    {filters !== null ? <select
                        defaultValue={select('queries.' + list + "." + query_name, '')}
                        className="form-control select-datatable"
                        onChange={this.filterOnChange.bind(this)}>
                        {this.getFilters(filters)}</select> : ''}
                </div>
            </Cell>
        );
    }
}