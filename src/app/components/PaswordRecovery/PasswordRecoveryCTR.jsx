import React, {Component} from "react";
import PasswordRecoveryPTR from "./PasswordRecoveryPTR";
import swagger from "./../../swagger/index";
import {NotifyBox, SuccessBoxAlert} from "../../functions/notifications";
let Ladda = require('ladda/js/ladda');
let $ = require('jquery');

export default class PasswordRecoveryCTR extends Component {
	loadingProgress;

	componentDidMount() {
		$('.preloader-page').hide();
	}

	forgotCallback({response}) {
		if (response.statusCode == '200') {
			SuccessBoxAlert({
				error: 'اطلاعات کاربری شما صحیح نمی‌باشد.',
				text: 'پسورد شما به موفقیت به روز رسانی شد.'
			});
			$(".recovery-password-form , .form-top-left").fadeOut(function () {
				$(".success-message-recovery").fadeIn();
				$(".form-top-right i").attr("class", "fa fa-check");
			});
		} else if (response.statusCode == '400') {
			this.stopLoading();
			NotifyBox('error', 'ایمیل شما یافت نشد. لطفا ایمیل معتبر وارد نمایید.', 8000);
		}
	}

	forgot(formValues) {
		(new swagger.UserApi())
			.userForgotCallPost({'payloadData': formValues})
			.then(response => this.forgotCallback(response));
	}

	loading() {
		this.loadingProgress = Ladda.create(document.querySelector('.recovery-password-form button'));
		this.loadingProgress.start();
	}

	stopLoading() {
		if (this.loadingProgress)
			this.loadingProgress.stop();
	}

	SubmitCall = (formValues, form) => {
		if (!form.valid())
			return;

		this.loading();
		this.forgot(formValues)
	};

	render() {
		return (<PasswordRecoveryPTR SubmitCall={this.SubmitCall}/>);
	}
}