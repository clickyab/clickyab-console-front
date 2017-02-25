import swagger from "../swagger/index";
import {select} from "./select";
import moment from "moment";

let lastTimeWePinged = null;
export default function ping() {
	if (lastTimeWePinged === null) {
		lastTimeWePinged = new Date();
		return new swagger.UserApi().userPingGet(select('user.token', 'no token'));
	}

	if (moment(new Date()).isAfter(moment(lastTimeWePinged).add(15, 'm'))) {
		lastTimeWePinged = new Date();
		return new swagger.UserApi().userPingGet(select('user.token', 'no token'));

	}

	return new Promise((resolve) => {
		resolve({data: select("user"), response: {statusCode: 200}});
	});
}