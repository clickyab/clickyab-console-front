import swagger from "../swagger/index";
import {select} from "./select";
import moment from "moment";
import {sync} from "./sync";
import {handleError} from "./catchError";
import {dispatch} from "./dispatch";
import {versionAction} from "../redux/actions/index";

let lastTimeWeVersioned = null;
export default function getVersion() {
	sync(function*() {
		try {
			if (lastTimeWeVersioned === null) {
				lastTimeWeVersioned = new Date();
				let {data} = yield new swagger.MiscApi().miscVersionGet();
				dispatch(versionAction(data.hash));
			}

			if (moment(new Date()).isAfter(moment(lastTimeWeVersioned).add(15, 'm'))) {

				let {data} = yield new swagger.MiscApi().miscVersionGet();
				dispatch(versionAction(data.hash));
                lastTimeWeVersioned = new Date();
			}

			return new Promise((resolve) => {
				resolve({data: {hash: select('version')}, response: {statusCode: 200}});
			});
		} catch (error) {
			handleError(error);
		}
	});
}