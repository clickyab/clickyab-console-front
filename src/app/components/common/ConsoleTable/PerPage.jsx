import React, {PropTypes} from "react";
import {translate, translateViaHtml} from "../../../functions/translate";
import {select} from "../../../functions/select";

export function PerPage({onPerPageChange, list}) {
    return (
        <div className="col-sm-6 col-xs-12">
            <div className="dataTables_length pull-left">
                <label>{translate("Show")}
                    <select key={Math.random()}
                            className="form-control input-sm input-xsmall input-inline text-center"
                            onChange={onPerPageChange}
                            defaultValue={select('queries.' + list + '.c', 10)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                    {translateViaHtml(
                        "In the queue of %s",
                        `<span class="bold">${select(list + 'List.items').length}</span>`
                    )}
                </label>
            </div>
        </div>
    );
}

PerPage.propTypes = {
    onPerPageChange: PropTypes.func,
    list: PropTypes.string
};