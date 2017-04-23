import React, {Component} from "react";
import LoginPTR from "./LoginPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {successfulLogin} from "../../redux/actions/login";
import {NotifyBox, SuccessBoxAlert} from "../../functions/notifications";
import {flush, updateLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {navigate} from "../../functions/navigate";
import {translate} from "../../functions/translate";
let Ladda = require('ladda/js/ladda');

@connect()
export default class LoginCTR extends Component {
	loadingProgress;

	componentDidMount() {
		this.props.dispatch(flush());
		$('.preloader-page').hide();
	}

	loginSuccessfullyDispatchers(user) {
		let {dispatch} = this.props;

		dispatch(successfulLogin());
		dispatch(updateUserInformation(user));
		dispatch(updateLocalStorageAction());
		navigate('/v1/advertiser');
	}

	loginCallback({error, data, response}) {
		if (response.statusCode == '200') {
			this.loginSuccessfullyDispatchers(Object.assign({}, data));

			NotifyBox('success', 'شما با موفقیت وارد شدید.')
		} else if (response.statusCode == '400') {

			let message = response.body.error != null ? response.body.error.text : response.body.email.text;
			this.stopLoading();
			NotifyBox('error', translate(message) ,8000);
		}
	}

	login(formValues) {
		(new swagger.UserApi())
			.userLoginPost({'payloadData': formValues})
			.then(response => this.loginCallback(response));
	}

	loading() {
		this.loadingProgress = Ladda.create(document.querySelector('.login-form button'));
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
		this.login(formValues)
	};

	render() {
		return (<LoginPTR SubmitCall={this.SubmitCall}/>);
	}
}
