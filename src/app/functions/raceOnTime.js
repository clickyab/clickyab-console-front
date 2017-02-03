import {sync} from "./sync";
import {handleError} from "./catchError";

export function raceOnTime(generator, timeOut) {
	return (new Promise((resolve, reject) => {
		let _resolve;

		const timer = setTimeout(() => {
			reject({error: new Error('timeout')});
		}, timeOut);

		const done = () => {
			_resolve();
			resolve({success: 'ok'});
			clearTimeout(timer);
		};

		new Promise((resolve) => {
			_resolve = resolve;

			sync(function*() {
				try {
					yield* generator(done);
				} catch (error) {
					handleError(error);
				}
			});

		}).then();
	}));
}