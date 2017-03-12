import {sync} from "./sync";
import {handleError} from "./catchError";

export function raceOnTime(generator, timeOut) {
    return (new Promise((resolve, reject) => {
        let _resolve;
        let _reject;

        const timer = setTimeout(() => {
            _reject();
            reject({error: new Error('timeout')});
        }, timeOut);

        const done = () => {
            _resolve();
            resolve({success: 'ok'});
            clearTimeout(timer);
        };

        new Promise((resolveThisPromise, rejectThisPromise) => {
            _resolve = resolveThisPromise;
            _reject = rejectThisPromise;
            sync(function*() {
                try {
                    yield* generator(done);
                    _resolve();
                } catch (error) {
                    handleError(error);
                    reject(error);
                    _reject(error);
                }
            });

        }).then();
    }));
}