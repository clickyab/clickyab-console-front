import React, {PropTypes} from "react";

function buildActions(id, item, props) {
    let {depositAction, edit, deleteAction} = props;

    if (typeof item === "undefined") {
        return;
    }

    const actionKeys = item.split(',');
    let buttons = [];
    for (let i = 0; i < actionKeys.length; i++) {
        if (actionKeys[i] === "edit") {
            buttons.push(edit(id, props));
        } else if (actionKeys[i] === "deposit") {
            buttons.push(depositAction(id, props));
        } else if (actionKeys[i] === "delete") {
            buttons.push(deleteAction(id, props));
        }
    }

    return buttons;
}

export function ConsoleCell(props) {
    let {actions, data, mutator, id} = props;

    return (
        actions ? <td>{buildActions(id, data, props)}</td> : mutator ? <td>{mutator(data, props)}</td> : <td>{data}</td>
    );
}