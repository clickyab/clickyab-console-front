import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {dispatch} from "../../functions/dispatch";
import {select} from "../../functions/select";
import {loading} from "../../functions/loading";
import {isLoginMiddleware} from "../isLoginMiddleware";
import {campaignReportListAction} from "../../redux/actions/index";
import {throwError} from "../../functions/Error";
import {navigate} from "../../functions/navigate";
import {handleError} from "../../functions/catchError";
import {shouldUpdateDefinition} from "../../redux/helpers";

//TODO: check it (o_0)
// function* campaignReportListController(done) {
//     loading(true);
//     yield* isLoginMiddleware();
//     const {error, data} = yield (new swagger.AdApi())
//         .campaignDetailIdGet('22', select('user.token'), {
//             ...select('queries.campaignReport', {}),
//             def: true
//         });
//
//     done();
//     if (!error) {
//         dispatch(campaignReportListAction(data));
//         loading(false);
//     } else {
//         throwError("campaignReportListController", function () {
//             navigate('/v1/login');
//         });
//     }
// }

export function* requesttoGetCampaignDetail() {
	const {error, data} = yield (new swagger.AdApi())
		.campaignChartGet(select('user.token', 'no token'))

	if (!error) {
		dispatch(advertiserCampaignChartAction(data))
	}
}

export default (nextState, replace, next) => sync(function*() {
	let id = nextState.params.campaign_id;
	try {
		yield* isLoginMiddleware();

		const {error, data} = yield (new swagger.AdApi())
			.campaignDetailIdGet(id, select('user.token'), {
				sort: 'created_at:DESC',
				...select('queries.campaignReport', {}),
				def: shouldUpdateDefinition('campaignReportList')
			});

		if (!error) {
			dispatch(campaignReportListAction(data));
			loading(false);
		} else {
			throwError("campaignReportListController", function () {
				navigate('/v1/login');
			});
		}
		next();
	} catch (error) {
		handleError(error);
	}
});



