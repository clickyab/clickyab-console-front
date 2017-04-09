import {select} from "./select";
import {sync} from "./sync";
import {getToken} from "../redux/helpers";
import swagger from "./../swagger/index";
import {sprintf} from "sprintf-js";
import React from "react";
export function translate(text, ...parameters) {
	let translated = select('translations', {})[select('locale')][text];

	if (translated) {
		return sprintf(translated, ...parameters);
	}
	sync(function*() {
		yield (new swagger.MiscApi).miscTranslatePost(getToken(), {
			'payloadData': {
				"translate": text
			}
		});
	});

	return sprintf(translated, ...parameters);
}

export function translateViaHtml(text, ...parameters) {
	return <span dangerouslySetInnerHTML={{__html:translate(text, ...parameters)}} />
}