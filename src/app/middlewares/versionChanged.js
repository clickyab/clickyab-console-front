import {VERSION, updateLocalStorageAction, asyncRemoveLocalStorageAction} from "../redux/actions/index";
import {dispatch} from "../functions/dispatch";
import {logout} from "../redux/actions/login";
import {updateUserInformation} from "../redux/actions/user";
import {navigate} from "../functions/navigate";
import {select} from "../functions/select";

export default function version(store) {
	return (next) => action => {
		if (action.type === VERSION) {
			if (store.getState().user && store.getState().version !== action.version) {
				dispatch(logout(select('user')));
				dispatch(updateUserInformation(select('user')));
				dispatch(updateLocalStorageAction());
				dispatch(asyncRemoveLocalStorageAction());
				navigate('/v1/login');
			}
		}

		return next(action);
	};
}