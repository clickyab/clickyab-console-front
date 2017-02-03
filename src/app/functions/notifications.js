let Lobibox = require('./../../../public/vendor/lobibox');
export function AlertBox(type, msg) {
	Lobibox.notify(
		type,
		{
			size: 'mini',
			rounded: false,
			sound: false,
			icon: false,
			delay: 5000,
			position: 'top right',
			delayIndicator: true,
			msg: msg
		}
	);
}

export function SuccessBoxAlert(response) {
	AlertBox('success', response.text);
}
export function FailedBoxAlert(response) {
	AlertBox('error', response.error);
}

