import {sync} from "../../functions/sync";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {handleError} from "../../functions/catchError";
import {isCampaignMiddleware} from "../isCampaignMiddleware";
import {select} from "../../functions/select";

export default (nextState, replace, next) => sync(function*() {
	try {
		yield* isLoginMiddleware();
		yield* isCampaignMiddleware({params: {campaign_id: select('createCampaignData.id')}});

		next();
	} catch (error) {
		handleError(error);
	}
});
