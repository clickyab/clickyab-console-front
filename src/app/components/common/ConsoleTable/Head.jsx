import React, {PropTypes} from "react";
import {ConsoleHeaderCell} from "./ConsoleHeaderCell";
import {translate} from "../../../functions/translate";
import {dataTableLoader} from "./ConsoleTable";

function headerCells({sort, list, headers}) {
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

export function Head({sort, list, headers}) {
    return (
        <thead>
        <tr>{headerCells({sort, list, headers})}</tr>
        </thead>
    );
}

Head.propTypes = {
    action: PropTypes.bool,
    list: PropTypes.string,
    sort: PropTypes.func
};