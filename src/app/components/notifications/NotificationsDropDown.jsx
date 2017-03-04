import React, {Component} from "react";
import ServerDownNotification from "../notifications/ServerDownNotification";
import SuccessNotification from "../notifications/SuccessNotification";
import WarningNotification from "../notifications/WarningNotification";
import {connect} from "react-redux";
import {dispatch} from "../../functions/dispatch";
import {emptyNotificationAction} from "../../redux/actions/index";
import * as _ from "lodash";

@connect(({notifications}) => ({notifications}))
export default class NotificationsDropDown extends Component {
    open = false;

    onClick() {
        dispatch(emptyNotificationAction());
    }

    type({count, notification}) {
        if (notification.type == 'server-down') {
            return <ServerDownNotification count={count} notification={notification}/>
        } else if (notification.type == 'success') {
            return <SuccessNotification count={count} notification={notification}/>
        } else if (notification.type == 'warning') {
            return <WarningNotification count={count} notification={notification}/>
        }
    }

    neutralDuplicates(notifications) {
        let duplicateEverNotifications = {};
        notifications.map(notification => {
            if (!duplicateEverNotifications[notification.message]) {
                duplicateEverNotifications[notification.message] = {
                    notification,
                    count: 1
                };
            } else {
                duplicateEverNotifications[notification.message] = {
                    notification: notification.time > duplicateEverNotifications[notification.message].notification.time
                        ? notification : duplicateEverNotifications[notification.message].notification,
                    count: duplicateEverNotifications[notification.message].count + 1
                };
            }
        });

        return duplicateEverNotifications;
    }

    orderByTime(notifications) {
        return _.sortBy(notifications, [function (data) {
            return data.notification.time;
        }]).reverse();
    }

    // we need to find duplicates
    // and sort them by time
    order(notifications) {
        let neutraled = this.neutralDuplicates(notifications);
        return this.orderByTime(neutraled)
    }

    render() {
        let {notifications} = this.props;
        notifications = this.order(notifications);

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
                    {notifications.map((data, index) => <li key={index}>{this.type(data)}</li>)}
                </ul>
            </li>
        );
    }
}