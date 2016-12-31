import ping from '../functions/ping';
import {throwError} from '../functions/Error';
import {isLogin} from '../redux/helpers';
import {browserHistory} from 'react-router';


export function* isLoginMiddleware() {
	if (isLogin()) {
		let {user, response} = yield ping();

		if (response.statusCode == 200) {
			throwError('isLoginMiddleware', function () {
				browserHistory.push('/profile');
			}, 'custom message');
		}
	}
}