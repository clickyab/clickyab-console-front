import React, {Component} from "react";
import {Link} from "react-router";

export default class WarningNotification extends Component {
	render() {
		return (
			<Link to="/v1/advertiser">
				<span className="fa fa-bullhorn"/>
				<span className="title">warn  {this.props.count}</span>
			</Link>
		);
	}
}