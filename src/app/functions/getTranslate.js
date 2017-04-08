import {sync} from "./sync";
import {dispatch} from "./dispatch";
import * as swagger from './../swagger/index';
import {getTranslation} from "../redux/actions/index";
import {select} from "./select";

export default function getTranslate() {
    sync(function*() {
        const {data} = yield (new swagger.MiscApi())
            .miscDumpLangGet(select('language'));
        dispatch(getTranslation(data));
    });
}
