import {select} from "./select";
import {NotifyBox} from "./notifications";

export default function checkSubmitProfile() {
	const msg = '<a href="/v1/profile" style="color:white">لطفا برای نکمیل اطلاعات حساب خود کلیک نمایید.</a>';
	setTimeout(() => {
		if (select('user.user_id') && (!(select('user.personal') == null) || !(select('user.corporation') == null)))
			NotifyBox('warning', msg, 0);
	}, 3000);
}