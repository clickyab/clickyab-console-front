import ping from "../functions/ping";
import { browserHistory } from 'react-router'
import {AlertBox} from "../functions/notifications";


export function* isLoginMiddleware() {
	let {error, user, response} = yield ping();
	if(response.statusCode == 200) {
		browserHistory.push('/profile');
		next();
	} else {
		browserHistory.push('/login');
		AlertBox("error","لطفا در ابتدا وارد حساب کاربری شوید")
	}
}