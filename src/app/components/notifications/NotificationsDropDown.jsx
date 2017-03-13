import React, {Component} from "react";
import ServerDownNotification from "../notifications/ServerDownNotification";
import SuccessNotification from "../notifications/SuccessNotification";
import WarningNotification from "../notifications/WarningNotification";
import {connect} from "react-redux";
import {dispatch} from "../../functions/dispatch";
import {markAllNotificationAsShown, removeNotification, emptyNotificationAction} from "../../redux/actions/index";
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
            <li className="dropdown dropdown-extended dropdown-notification notification-dropdown"
                id="header_notification_bar">
                <div className="dropdown-toggle notifications-division" data-toggle="dropdown" data-hover="dropdown"
                     data-close-others="true" aria-expanded="false" style={{paddingRight: '7px'}}>
                    <i className="icon-bell"/>
                    <Count/>
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
        const count = this.count(this.props.notifications);
        return (
            count != 0 ?
                <span className="badge badge-default">
                    <span>{ this.count(this.props.notifications) }</span>
                </span> :
                <span/>
        )

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

    showTrash(e) {
        $(e.target).find('.time').append('<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>').css({
            color: 'red',
            fontSize: '15px'
        })
    }

    hideTrash(e) {
        $(e.target).find('#trash').detach();
    }

    clearAllNotification() {
        dispatch(emptyNotificationAction());
    }

    count(notifications) {
        let count = 0;
        notifications.map(notification => {
            if (notification.shown)
                count += 1;
        });

        return count;
    }

    render() {
        let {notifications} = this.props;
        let orderedNotifications = this.order(notifications);

        return (
            <ul className="dropdown-menu dropdown-menu-default keep_open">
                <li className="external">
                    <h3>
                        <span className="bold">{this.count(notifications)} پیام </span> آرشیو شده
                    </h3>
                    <a onClick={this.clearAllNotification} style={{fontSize: '12px'}}>حذف همه</a>
                </li>
                <ul className="dropdown-menu-list scroller">
                    {orderedNotifications.map((data, index) => <li onMouseLeave={this.hideTrash}
                                                                   onMouseEnter={this.showTrash} key={index}><a
                        href="javascript:;"><span
                        className="details"> {this.type(data)}</span></a></li>)}
                </ul>
            </ul>
        );
    }
}