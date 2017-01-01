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
                buttons.push(edit(id));
            } else if (actionKeys[i] == "change") {
                buttons.push(change(id));
            }
        }

        return buttons;
    }

    let cell = actions ? (<Cell {...props}>
            {buildActions(row.id, mutator ? mutator(item) : item, {change, edit})}
        </Cell>) : (<Cell {...props}>
            {mutator ? mutator(item) : item}
        </Cell>);

    return (cell);
};