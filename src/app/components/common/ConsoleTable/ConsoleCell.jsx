import React, {Component} from "react";

export class ConsoleCell extends Component {
	buildActions(id, item, type) {
		let {depositAction, edit, deleteAction} = this.props;

		if (typeof item == "undefind") {
			return;
		}

		const actionKeys = item.split(',');
		let buttons = [];
		for (let i = 0; i < actionKeys.length; i++) {
			if (actionKeys[i] == "edit") {
				buttons.push(edit(id, this.props));
			} else if (actionKeys[i] == "deposit") {
				buttons.push(depositAction(id, this.props));
			} else if (actionKeys[i] == "delete") {
				buttons.push(deleteAction(id, this.props));
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