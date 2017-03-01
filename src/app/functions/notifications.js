import {dispatch} from "./dispatch";
import {addNotificationAction} from "../redux/actions/index";
let Lobibox = require('./../../../public/vendor/lobibox');

export function AlertBox(type, message) {
	console.log('AlertBox', type, message);
	dispatch(addNotificationAction({
		type, message
	}));
}

export function SuccessBoxAlert(response) {
	console.log('SuccessBoxAlert', response.text);
	dispatch(addNotificationAction({
		type: 'success', message: response.text
	}));
}
export function FailedBoxAlert(response) {
	dispatch(addNotificationAction({
		type: 'error', message: response.error
	}));
	console.log('FailedBoxAlert', response.error);
}

export function NotifyBox(type, message, delay) {
	dispatch(addNotificationAction({
		type, message
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

