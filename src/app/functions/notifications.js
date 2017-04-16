import {dispatch} from "./dispatch";
import {addNotificationAction} from "../redux/actions/index";
let toastr = require('toastr');

export function AlertBox(type, message, showBox = false) {
	dispatch(addNotificationAction({
		type, message, time: new Date()
	}));
	toastr.options = {
		"preventDuplicates": true,
		"preventOpenDuplicates": true,
		"maxOpened": 1,
		"timeOut": 6000
	};
	if (showBox) {
		if (type == "warning") {
			toastr.warning(message);
		} else if (type === "error") {
			toastr.error(message);
		} else if (type == "success") {
			toastr.success(message);
		}
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

	toastr.options = {
		"preventDuplicates": true,
		"preventOpenDuplicates": true,
		"maxOpened": 1
	};

	if (type == "warning") {
		toastr.warning(message);
	} else if (type == "error") {
		toastr.error(message);
	} else if (type == "success") {
		toastr.success(message);
	}
}

