import ping from "../functions/ping";
import {throwError} from "../functions/Error";
import {isLogin} from "../redux/helpers";
import {navigate} from "../functions/navigate";

export function* redirectIfLogin(pathName) {
	if (isLogin()) {
		let {response} = yield ping();

		if (response.statusCode == 200) {
			throwError('isLoginMiddleware', function () {
				navigate(pathName || '/v1/profile');
			}, 'custom message');
		}
	}
}