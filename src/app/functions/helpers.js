import {AlertBox} from "./notifications";
import {navigate} from "./navigate";

export function checkStatus() {
	switch (response.statusCode) {
		case 200:
			//ok
			return response;
			break;
		case 300:
			//redirect
			console.log('redirect');
			break;
		case 400:
			//request error
			console.log('request error');
			break;
		case 401:
			//invalid token
			console.log('invalid token');
			break;
		case 403:
			//forbidden
			console.log('forbidden');
			break;
		case 404:
			//not found
			console.log('not found');
			break;
	}
}
export function parseJSON(response) {
	return response.json()
}

export function ifInvalidToken(response) {
	if (response.statusCode == '401') {
		navigate('/v1/login');
		AlertBox('error', 'اعتبار شما منقضی شده است لطفا مجددا وارد شوید');
	}
}