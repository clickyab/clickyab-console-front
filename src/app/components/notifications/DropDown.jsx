import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import * as _ from "lodash";
import {dispatch} from "../../functions/dispatch";
import {Type} from "./Type";
import {emptyNotificationAction, removeNotification, updateLocalStorageAction} from "../../redux/actions/index";
import {RemoveAll} from "./RemoveAll";

@connect(({notifications}) => ({notifications}))
export default class DropDown extends Component {
    // we did this to bundle all notifications of one type under
    // one key (notification.message)
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

    // we add time to notifications on (notification.time) so we can sort them later
    orderByTime(notifications) {
        return _.sortBy(notifications, [function (data) {
            return data.notification.time;
        }]).reverse();
    }

    // there is two problem
    // one is we have to remove duplicates and have their count
    // two is we have to re order all notifications by time
    order(notifications) {
        let neutralized = this.neutralDuplicates(notifications);
        let orderedNotifications = this.orderByTime(neutralized);

        return {orderedNotifications, count: orderedNotifications.count};
    }

    onAnEventSeenClick(id) {
        dispatch(removeNotification(id));
        dispatch(updateLocalStorageAction());
    }


    clearAllNotification() {
        dispatch(emptyNotificationAction());
        dispatch(updateLocalStorageAction())
    }

    // count system should count on
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
        let {orderedNotifications, count} = this.order(notifications);

        return (
            <ul className="dropdown-menu dropdown-menu-default keep_open">
                <li className="external">
                    <h3>
                        <span className="bold">{this.count(notifications)} پیام </span> آرشیو شده
                    </h3>
                    <RemoveAll count={count}/>
                </li>
                <ul className="dropdown-menu-list scroller">
                    {orderedNotifications.map((data) => (
                        <li key={Math.random()}>
                            <a href="javascript:;">
                                <div className="details">
                                    <Type {...data} onAnEventSeenClick={this.onAnEventSeenClick}/>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </ul>
        );
    }
}

DropDown.propTypes = {
    notifications: PropTypes.array
};