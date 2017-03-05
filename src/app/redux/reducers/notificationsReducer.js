import {NOTIFICATIONS, EMPTY_NOTIFICATIONS, MARK_NOTIFICATIONS_AS_SHOWN, REMOVE_NOTIFICATION} from "../actions/index";

export function notificationsReducer(state = [], action) {
    switch (action.type) {
        case NOTIFICATIONS:
            return [...state, action.notification];
        case EMPTY_NOTIFICATIONS:
            return [];
        case MARK_NOTIFICATIONS_AS_SHOWN:
            return state.map(notification => {
                notification.shown = true;
                return notification;
            });
        case REMOVE_NOTIFICATION:
            return state.filter(notification => {
                if (notification.id != action.id)
                    return notification;
            });
    }

    return state;
}