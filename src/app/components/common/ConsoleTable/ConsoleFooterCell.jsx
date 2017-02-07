import React, {Component} from "react";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";

export class ConsoleFooterCell extends Component {
    timeout;

    onSearchChange(event) {
        let {list, query_name, search, loader} = this.props;
        clearTimeout(this.timeout);

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, query_name, event.target.value));
        dispatch(updateLocalStorageAction());

        this.timeout = setTimeout(() => {
            loader(true);
            search(event, query_name);
            loader(false);
        }, 250);
    }

    getFilters(filters) {
        let _filters = [];
        let {translator} = this.props;
        _filters.push(<option key="all" value="">همه</option>);
        for (let keyFilter in filters) {
            _filters.push(<option key={keyFilter} value={keyFilter}>{translator(keyFilter)}</option>)
        }

        return _filters;
    }

    filterOnChange(event) {
        let {query_name, list, filter, loader} = this.props;

        dispatch(channelQueryAction(list, 'p', 1));
        dispatch(channelQueryAction(list, query_name, event.target.value));
        dispatch(updateLocalStorageAction());

        loader(true);
        filter(event, query_name);
        loader(false);
    }

    render() {
        let {filters, footer, query_name, list, searchable, translator} = this.props;

        return (
            <td>
                <div className="search-filter-datatable">
                    {searchable ?
                        <input className="form-control type-search-datatable"
                               onChange={(event) => {
                                   this.onSearchChange(Object.assign({}, event));
                               }}
                               defaultValue={select('queries.' + list + "." + query_name, '')}
                               placeholder={translator(footer.title)}/> : ''}

                    {filters !== null ? <select
                        defaultValue={select('queries.' + list + "." + query_name, '')}
                        className="form-control select-datatable"
                        onChange={(event) => {
                            this.filterOnChange(Object.assign({}, event));
                        }}>
                        {this.getFilters(filters)}</select> : ''}
                </div>
            </td>
        );
    }
}

