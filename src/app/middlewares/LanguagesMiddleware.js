import {sync} from "../functions/sync";
import {loadLanguage} from "./loadLanguage";

export default (nextState, replace, next) => sync(function*() {
    yield *loadLanguage();

    next();
});