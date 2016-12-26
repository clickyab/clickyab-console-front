import React, {Component} from "react";
import {Cell} from 'fixed-data-table';



export const TextCell = ({rowIndex, actions, change, edit, column, items, ...props}) => {
    const item = items[rowIndex][column];
    const row = items[rowIndex];

    function buildActions(id, item, actions) {
        const actionKeys = item.split(',');
        let buttons = [];
        for (let i = 0; i < actionKeys.length; i++) {
            if(actionKeys[i] == "change") {
                buttons.push(<button key="change" onClick={(event) => actions.change(event, id)}>change</button>);
            } else if(actionKeys[i] == "edit") {
                buttons.push(<button key="edit" onClick={(event) => actions.edit(event, id)}>edit</button>);
            }
        }

        return buttons;
    }

    let cell = actions ? (<Cell {...props}>
            {buildActions(row.id, item, {change, edit})}
        </Cell>) : (<Cell {...props}>
            {item}
        </Cell>);

    return (cell);
};