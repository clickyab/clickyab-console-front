import React, {Component} from "react";

export class ConsoleCell extends Component {
	buildActions(id, item) {
		let {depositAction, edit, deleteAction} = this.props;

		const actionKeys = item.split(',');
		let buttons = [];
		for (let i = 0; i < actionKeys.length; i++) {
			if (actionKeys[i] == "edit") {
				buttons.push(edit(id));
			} else if (actionKeys[i] == "deposit") {
				buttons.push(depositAction(id));
			} else if (actionKeys[i] == "delete") {
				buttons.push(deleteAction(id));
			}
		}

		return buttons;
	}

	render() {
		let {mutator, data, actions, id} = this.props;

		return (
			actions ? <td>{this.buildActions(id, data)}</td> : mutator ? <td>{mutator(data, this.props)}</td> :
				<td>{data}</td>
		);
	}
}