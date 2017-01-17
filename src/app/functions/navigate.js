import {browserHistory} from "react-router";

export function navigate(path) {
    browserHistory.push(path);
}