import {sync} from "./sync";
export function raceOnTime(generator, next, recover, timeOut) {
    let _resolve;
    let error = new Error('timeout');

    const timer = setTimeout(() => {
        throw error;
    }, timeOut);

    const done = () => {
        _resolve();
        clearTimeout(timer);
    };

    new Promise((resolve, reject) => {
        _resolve = resolve;

        sync(function*() {
            yield* generator(done, next);
        });
    }).then();
}