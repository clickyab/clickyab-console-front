let swal = require('sweetalert');
import * as Lobibox from "../../../public/vendor/lobibox";

export function sweetAlert(type, msg) {
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