import {dispatch} from "./dispatch";
import {addNotificationAction} from "../redux/actions/index";
let Lobibox = require('./../../../public/vendor/lobibox');

export function AlertBox(type, message , showBox) {
	if(showBox == null || showBox == "undefined") {
		showBox = false;
	}
	dispatch(addNotificationAction({
		type, message, time: new Date()
	}));
	if(showBox == true) {
        Lobibox.notify(
            type, {
                size: 'mini',
                rounded: false,
                sound: false,
                icon: false,
                delay: 5000,
                position: 'top right',
                delayIndicator: true,
                msg: message
            }
        );
	}
}

export function SuccessBoxAlert(response) {
	dispatch(addNotificationAction({
		type: 'success', message: response.text, time: new Date()
	}));
}
export function FailedBoxAlert(response) {
	dispatch(addNotificationAction({
		type: 'error', message: response.error, time: new Date()
	}));
}

export function NotifyBox(type, message, delay) {
	dispatch(addNotificationAction({
		type, message, time: new Date()
	}));

	Lobibox.notify(
		type, {
			size: 'mini',
			rounded: false,
			sound: false,
			icon: false,
			delay: delay,
			position: 'top right',
			delayIndicator: true,
			msg: message
		}
	);
}

