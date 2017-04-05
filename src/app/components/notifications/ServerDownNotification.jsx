import React, {Component} from "react";

export default class ServerDownNotification extends Component {
	onClick(event) {
		let {onAnEventSeenClick, notification: {id}} = this.props;

		onAnEventSeenClick(id)
	}

	render() {
		let {count, notification: {message}} = this.props;

		return (
			<div>
				<span className="label label-sm label-icon label-danger"><i className="fa fa-bolt"/></span>
				<span className="title">{count} - {message}  </span>
				<span className="time" onClick={this.onClick.bind(this)}/>
			</div>
		);
	}
}