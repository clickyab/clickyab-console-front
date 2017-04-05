import {select} from "./select";
import {NotifyBox} from "./notifications";
import moment from "moment";

let notification;
let lastTimeWeShowed = null;

function display() {
	const msg = 'لطفا برای نکمیل اطلاعات حساب خود کلیک نمایید.';

	if ((select('user.user_id') && (select('user.personal') || select('user.corporation')) == null) == true)
		notification = NotifyBox('warning', msg);
}

export default function checkSubmitProfile() {
	if (lastTimeWeShowed === null) {
		lastTimeWeShowed = new Date();
		display();
	}

	if (moment(new Date()).isAfter(moment(lastTimeWeShowed).add(1, 'm'))) {
		display();
		lastTimeWeShowed = new Date();
	}
}