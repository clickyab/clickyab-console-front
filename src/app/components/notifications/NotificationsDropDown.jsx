import React, {Component} from "react";
import ServerDownNotification from "../notifications/ServerDownNotification";
import SuccessNotification from "../notifications/SuccessNotification";
import WarningNotification from "../notifications/WarningNotification";
import {connect} from "react-redux";
import {dispatch} from "../../functions/dispatch";
import {emptyNotificationAction} from "../../redux/actions/index";

@connect(({notifications}) => ({notifications}))
export default class NotificationsDropDown extends Component {
	open = false;

	onClick() {
		dispatch(emptyNotificationAction());
	}

	type(notification) {
		if (notification.type == 'server-down') {
			return <ServerDownNotification notification={notification}/>
		} else if (notification.type == 'success') {
			return <SuccessNotification notification={notification}/>
		} else if (notification.type == 'warning') {
			return <WarningNotification notification={notification}/>
		}
	}

	render() {
		let {notifications} = this.props;
		notifications = notifications.reverse();

		return (
			<li className="dropdown dropdown-language">
				<div className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
					 data-close-others="true" aria-expanded="true" style={{paddingRight: '7px'}}>
					<span className="badge" style={{
						color: "red",
						backgroundColor: "white"
					}}>{ notifications.length }</span>
					<span className="langname">پیام ها</span>
					<span className="fa fa-angle-down"/>
				</div>
				<ul className="dropdown-menu dropdown-menu-default">
					{notifications.map((notification, index) => <li key={index}>{this.type(notification)}</li>)}
				</ul>
			</li>
		);
	}
}