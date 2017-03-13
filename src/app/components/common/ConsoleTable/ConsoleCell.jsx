import React, {Component} from "react";

export class ConsoleCell extends Component {
<<<<<<< Updated upstream
    buildActions(id, item, edit) {
=======
    buildActions(id, item) {
        let {depositAction, edit} = this.props;
>>>>>>> Stashed changes
        const actionKeys = item.split(',');
        let buttons = [];
        for (let i = 0; i < actionKeys.length; i++) {
            if (actionKeys[i] == "edit") {
                buttons.push(edit(id));
<<<<<<< Updated upstream
=======
            } else if (actionKeys[i] == "deposit") {
                buttons.push(depositAction(id));
>>>>>>> Stashed changes
            }
        }

        return buttons;
    }

    render() {
<<<<<<< Updated upstream
        let {mutator, data, actions, edit, id} = this.props;
=======
        let {mutator, data, actions, id} = this.props;

>>>>>>> Stashed changes
        return (
            actions ? <td>{this.buildActions(id, data, edit)}</td> : mutator ? <td>{mutator(data, this.props)}</td> :
                    <td>{data}</td>
        );

    }
}