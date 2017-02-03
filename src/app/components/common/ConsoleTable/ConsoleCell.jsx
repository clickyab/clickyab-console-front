import React, {Component} from "react";

export class ConsoleCell extends Component {
	buildActions(id, item, edit) {
		const actionKeys = item.split(',');
		let buttons = [];
		for (let i = 0; i < actionKeys.length; i++) {
			if (actionKeys[i] == "edit") {
				buttons.push(edit(id));
			}
		}

		return buttons;
	}

	render() {
		let {mutator, data, actions, edit, id} = this.props;
		return (
			actions ? <td>{this.buildActions(id, data, edit)}</td> : mutator ? <td>{mutator(data, this.props)}</td> :
					<td>{data}</td>
		);
	}
}