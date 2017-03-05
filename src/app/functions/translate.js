import {select} from "./select";
import {sync} from "./sync";
import {getToken} from "../redux/helpers";
import swagger from "./../swagger/index";

export function translate(text) {
    let translated = select('translations', {})[text];
    if (translated) {
        return translated
    }

    sync(function*() {
        yield (new swagger.MiscApi).miscPostTranslatePost(getToken(), {
            'payloadData': {
                "translate": text
            }
        });
    });

    return text;
}