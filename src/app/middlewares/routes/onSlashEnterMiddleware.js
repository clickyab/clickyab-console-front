import {sync} from "../../functions/sync";
import {handleError} from "../../functions/catchError";
import {redirectIfLogin} from "../redirectIfLogin";
import {loadLanguage} from "../loadLanguage";

export default () => sync(function*() {
	try {
        yield *loadLanguage();
        yield* redirectIfLogin('/v1/advertiser');

		window.location = '/v1/login';
	} catch (error) {
		handleError(error);
	}
});
