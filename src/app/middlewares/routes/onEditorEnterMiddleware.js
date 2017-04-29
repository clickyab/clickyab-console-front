import {sync} from "../../functions/sync";
import {handleError} from "../../functions/catchError";
import {isCampaignMiddleware} from "../isCampaignMiddleware";

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isCampaignMiddleware(nextState);

		next();
	} catch (error) {
		handleError(error);
	}
});
