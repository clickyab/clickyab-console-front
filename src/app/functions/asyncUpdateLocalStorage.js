import {store} from '../redux/store';
import {updateLocalStorageAction} from '../redux/actions/index';

export function asyncUpdateLocalStorage() {
	new Promise((resolve, reject) => {
		store.dispatch(updateLocalStorageAction());
		resolve();
	})
}