export function throwError(middleWareName, recover, _message = "") {
    let error = new Error('cant pass '  + middleWareName);
    error.recover = function () {
        recover();
    };

    error.message = function () {
        return _message;
    };

    throw  error;
}