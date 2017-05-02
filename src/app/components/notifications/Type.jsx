import React, {PropTypes} from "react";
import ServerDownNotification from "../notifications/ServerDownNotification";
import SuccessNotification from "../notifications/SuccessNotification";
import WarningNotification from "../notifications/WarningNotification";
import ErrorNotification from "./../notifications/ErrorNotification";

export function Type({count, notification, onAnEventSeenClick}) {
    if (notification.type === 'server-down') {
        return (
            <ServerDownNotification count={count} onAnEventSeenClick={onAnEventSeenClick} notification={notification}/>
        );
    } else if (notification.type === 'success') {
        return (
            <SuccessNotification count={count} onAnEventSeenClick={onAnEventSeenClick} notification={notification}/>
        );
    } else if (notification.type === 'warning') {
        return (
            <WarningNotification count={count} onAnEventSeenClick={onAnEventSeenClick} notification={notification}/>
        );
    } else if (notification.type === 'error') {
        return (
            <ErrorNotification count={count} onAnEventSeenClick={onAnEventSeenClick} notification={notification}/>
        );
    }
}

Type.propTypes = {
    count: PropTypes.number,
    notification: PropTypes.object,
    onAnEventSeenClick: PropTypes.func
};