import {dispatch} from "../functions/dispatch";
import {getTranslation, updateLocalStorageAction} from "../redux/actions/index";
import swagger from "../swagger/index";
import {sync} from "../functions/sync";
import {select} from "../functions/select";

export default (nextState, replace, next) => sync(function*() {
    if(!select('translations', {})['fa_IR']) {
        const {data} = yield (new swagger.MiscApi())
            .miscDumpLangGet('fa_IR');
        dispatch(getTranslation(data));
        dispatch(updateLocalStorageAction());
    }

    next();
});