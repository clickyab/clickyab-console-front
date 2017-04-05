import React, {Component} from "react";
import AddTranslationCodeModalPTR from "./AddTranslationCodeModalPTR";
import swagger from "./../../swagger/index";
import {AlertBox} from "./../../functions/notifications";
import {select} from "./../../functions/select";
import {sync} from "./../../functions/sync";
import {dispatch} from "./../../functions/dispatch";
import {telegramItemsListAction} from "./../../redux/actions/index";
import {change} from "redux-form/lib/actions";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class AddTranslationCodeModalCTR extends Component {
	GetTelegramCode(formValues) {
		sync(function*() {
			loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
			loadingProgress.start();
			let {response} = yield (new swagger.TelegramApi())
				.telegramPost(select("user.token", "no token"));

			if (response.statusCode == 200) {
				let resolve = JSON.parse(response.text);
				let keyCode = resolve.key;
				dispatch(change("AddTelegramCodeModalPTR", "generated_code", "/verify-" + keyCode));
				$(".generate-input-code").css("opacity", "1");
				loadingProgress.stop();
				const {data} = yield(new swagger.TelegramApi()).telegramListGet(select('user.token'));
				dispatch(telegramItemsListAction(data));
			} else if (response.statusCode == '400') {
				AlertBox("error", "اختلالی در سیستم به وجود آمده است لطفا دوباره تلاش کنید")
			}
		});
	}

	SubmitToGetTelegramCode = (formValues) => {
		this.GetTelegramCode(formValues)
	};

	render() {
		return (<AddTranslationCodeModalPTR SubmitTelegramGetCode={this.SubmitToGetTelegramCode}/>);
	}
}
