import {sync} from "./sync";
export function raceOnTime(generator, next, recover, timeOut) {
    let error = new Error('timeout');

    const timer = setTimeout(() => {
        throw error;
    }, timeOut);

    const done = () => {
        clearInterval(timer);
    };

    new Promise((resolve, reject) => {
        sync(function*() {
            yield* generator(done, next);
            resolve();
        });
    }).then();
}