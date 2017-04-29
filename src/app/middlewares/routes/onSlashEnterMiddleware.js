import {sync} from "../../functions/sync";
import {handleError} from "../../functions/catchError";
import {redirectIfLogin} from "../redirectIfLogin";

export default () => sync(function*() {
	try {
		yield* redirectIfLogin('/v1/advertiser');

		window.location = '/v1/login';
	} catch (error) {
		handleError(error);
	}
});
