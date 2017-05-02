import React, {PropTypes} from "react";
import {select} from "../../../functions/select";
import {translate, translateViaHtml} from "../../../functions/translate";

function pagination(list, total) {
    const per_page = select('queries.' + list + '.c', 10);
    let pages_count = Math.floor(total / per_page);
    if (pages_count === 0) {
        pages_count = 1;
    } else if (total % per_page !== 0) {
        pages_count += 1;
    }

    let pages = [];
    for (let i = 0; i < pages_count; i++) {
        pages.push(<option key={i}>{i + 1}</option>);
    }

    return pages;
}

export function Pagination({list, total, onPaginationChange}) {
    const paginations = pagination(list, total);
    return (
        <div className="col-sm-6 col-xs-12">
            <div className="dataTables_length pagination">
                <label>{translate("View page")}
                    <select key={Math.random()}
                            className="form-control input-sm input-xsmall input-inline text-center"
                            defaultValue={select('queries.' + list + '.p', 1)} onChange={onPaginationChange}>
                        {paginations}
                    </select>
                    {translateViaHtml(
                        "from %s page",
                        `<span class="bold">${paginations.length}</span>`
                    )}
                </label>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    list: PropTypes.string.isRequired
};