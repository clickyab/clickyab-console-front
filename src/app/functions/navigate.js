import {browserHistory} from "react-router";

export function navigate(path, parameters) {
    // /v1/milad/:milad_id/salam
    if (parameters) {
        // :([a-zA-Z_]+):
        path.match(/:([a-zA-Z_]+):/g)
    }
    browserHistory.push(path);
}