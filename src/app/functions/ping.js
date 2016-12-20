import swagger from './../swagger/index';
import {getToken} from "../redux/helpers";
import {asyncUpdateLocalStorage} from "./asyncUpdateLocalStorage";

export default function ping() {
	return new Promise((resolve, reject) => {
		new swagger.UserApi().userPingGet(getToken(), (error, user, response) => {
			asyncUpdateLocalStorage();
			resolve({
				error, user, response
			});
		})
	});
}