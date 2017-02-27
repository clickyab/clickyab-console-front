import React, {Component} from "react";
import {Link} from "react-router";

export default class ServerDownNotification extends Component {
	render() {
		return (
			<Link to="/v1/advertiser">
				<span className="fa fa-bullhorn"/>
				<span className="title">server down</span>
			</Link>
		);
	}
}