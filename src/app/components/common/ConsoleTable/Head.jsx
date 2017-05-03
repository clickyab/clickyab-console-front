import React, {Component, PropTypes} from "react";
import {ConsoleHeaderCell} from "./ConsoleHeaderCell";
import {translate} from "../../../functions/translate";
import {dataTableLoader} from "./ConsoleTable";

export class Head extends Component {
    headerCells() {
        let {sort, list, headers} = this.props;

        return headers().map(
            (header, index) => <ConsoleHeaderCell
                key={index}
                list={list}
                loader={dataTableLoader}
                sort={sort}
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

    render() {
        return (
            <thead><tr>{this.headerCells()}</tr></thead>
        );
    }
}

Head.propTypes = {
    action: PropTypes.bool,
    list: PropTypes.string,
    sort: PropTypes.func
};