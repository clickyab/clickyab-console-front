import {select} from "./select";
import {sync} from "./sync";
import swagger from "./../swagger/index";
import {sprintf} from "sprintf-js";
import React from "react";

export function translate(text, ...parameters) {
    try {
        let translated = select('translations', {})[select('locale')][text];
        return sprintf(translated.length > 0 ? translated : text, ...parameters);
    } catch (error) {
        sync(function*() {
            yield (new swagger.MiscApi).miscTranslatePost({
                payloadData: {
                    translate: text
                }
            });
        });

        return sprintf(text, ...parameters);
    }
}

export function translateViaHtml(text, ...parameters) {
    return <span dangerouslySetInnerHTML={{__html: translate(text, ...parameters)}}/> // eslint-disable-line
}