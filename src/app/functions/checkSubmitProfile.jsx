import {select} from "./select";
import {NotifyBox} from "./notifications";
import moment from "moment";

let notification;
let lastTimeWeShowed = null;

function display() {
	const msg = '<a href="/v1/profile" style="color:white">لطفا برای نکمیل اطلاعات حساب خود کلیک نمایید.</a>';
	setTimeout(() => {
		if(notification) {
			notification.remove()
		}
		if (select('user.user_id') && (!(select('user.personal') == null) || !(select('user.corporation') == null)))
			notification = NotifyBox('warning', msg, 0);
	}, 3000);
}

export default function checkSubmitProfile() {
	if (lastTimeWeShowed === null) {
		lastTimeWeShowed = new Date();
		display();
	}

	if (moment(new Date()).isAfter(moment(lastTimeWeShowed).add(1, 'm'))) {
		display();
	}
}