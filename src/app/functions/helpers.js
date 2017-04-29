import {AlertBox} from "./notifications";
import {navigate} from "./navigate";

export function ifInvalidToken(response) {
	if (response.statusCode == '401') {
		navigate('/v1/login');
		AlertBox('error', 'اعتبار شما منقضی شده است لطفا مجددا وارد شوید');
	}
}