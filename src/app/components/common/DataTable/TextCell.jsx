import React, {Component} from "react";
import {Cell} from 'fixed-data-table';


export const TextCell = ({rowIndex, actions, mutator, change, edit, column, items, ...props}) => {
    const item = items[rowIndex][column];
    const row = items[rowIndex];

    function buildActions(id, item, actions) {
        const actionKeys = item.split(',');
        let buttons = [];
        for (let i = 0; i < actionKeys.length; i++) {
            if (actionKeys[i] == "edit") {
                buttons.push(<a key="edit" className="btn btn-sm btn-outline grey-salsabtn btn-sm btn-outline grey-salsa edit-item" data-channel={id}><i className="fa fa-edit"/> ویرایش</a>);
            }
        }

        return buttons;
    }

    let cell = actions ? (<Cell {...props}>
            {buildActions(row.id, mutator ? mutator(item): item, {change, edit})}
        </Cell>) : (<Cell {...props}>
            {mutator ? mutator(item): item}
        </Cell>);

    return (cell);
};