import React, {Component} from "react";
import ServerDownNotification from "../notifications/ServerDownNotification";
import SuccessNotification from "../notifications/SuccessNotification";
import WarningNotification from "../notifications/WarningNotification";
import {connect} from "react-redux";
import {dispatch} from "../../functions/dispatch";
import {markAllNotificationAsShown, removeNotification} from "../../redux/actions/index";
import * as _ from "lodash";

export default class NotificationsDropDown extends Component {
    open = false;

    constructor(props) {
        super(props);
    }

    bindToNotifications() {
        $('.notification-dropdown').on('shown.bs.dropdown', function () {
            dispatch(markAllNotificationAsShown())
        });
    }

    componentDidMount() {
        this.bindToNotifications();
    }

    componentWillUnmount() {
        $('.notification-dropdown').unbind();
    }

    render() {
        return (
            <li className="dropdown dropdown-language notification-dropdown">
                <div className="dropdown-toggle notifications-division" data-toggle="dropdown" data-hover="dropdown"
                     data-close-others="true" aria-expanded="false" style={{paddingRight: '7px'}}>
                    <Count/>
                    <span className="langname">پیام ها</span>
                    <span className="fa fa-angle-down"/>
                </div>
                <DropDown/>
            </li>
        );
    }
}

@connect(({notifications}) => ({notifications}))
class Count extends Component {
    count(notifications) {
        let count = 0;
        notifications.map(notification => {
            if (!notification.shown)
                count += 1;
        });

        return count;
    }

    render() {
        return (
            <span className="badge" style={{
                color: "red",
                backgroundColor: "white"
            }}>{ this.count(this.props.notifications) }</span>
        );
    }
}

@connect(({notifications}) => ({notifications}))
class DropDown extends Component {
    type({count, notification}) {
        if (notification.type == 'server-down') {
            return <ServerDownNotification count={count} onAnEventSeenClick={this.onAnEventSeenClick}
                                           notification={notification}/>
        } else if (notification.type == 'success') {
            return <SuccessNotification count={count} onAnEventSeenClick={this.onAnEventSeenClick}
                                        notification={notification}/>
        } else if (notification.type == 'warning') {
            return <WarningNotification count={count} onAnEventSeenClick={this.onAnEventSeenClick}
                                        notification={notification}/>
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

    order(notifications) {
        let neutraled = this.neutralDuplicates(notifications);
        return this.orderByTime(neutraled)
    }

    onAnEventSeenClick(id) {
        dispatch(removeNotification(id));
    }

    render() {
        let {notifications} = this.props;
        let orderedNotifications = this.order(notifications);

        return (
            <ul className="dropdown-menu dropdown-menu-default keep_open">
                {orderedNotifications.map((data, index) => <li key={index}>{this.type(data)}</li>)}
            </ul>
        );
    }
}