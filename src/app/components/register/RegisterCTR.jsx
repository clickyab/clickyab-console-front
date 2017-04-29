import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {failedRegister, successfulRegister} from "../../redux/actions/register";
import {NotifyBox} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import RegisterPTR from "./RegisterPTR";
import swagger from "./../../swagger/index";
import {navigate} from "../../functions/navigate";
import {successfulLogin} from "../../redux/actions/login";
import {translate} from './../../functions/translate';
let Ladda = require('ladda/js/ladda');
let $ = require("jquery");

@connect()
export default class RegisterCTR extends Component {
	loadingProgress;

	componentDidMount() {
		$('.preloader-page').hide();
	}

	registerSuccessfullyDispatchers(user) {
		let {dispatch} = this.props;

		dispatch(successfulRegister());
		dispatch(successfulLogin());
		dispatch(successfulRegister());
		dispatch(updateUserInformation(user));
		dispatch(updateLocalStorageAction());
		navigate('/v1/advertiser');
	}

	failed400Dispatcher() {
		this.props.dispatch(failedRegister());
	}

	registerCallback({data, response}) {
		if (response.statusCode == '200') {
			this.registerSuccessfullyDispatchers(Object.assign({}, data));

			NotifyBox('success', 'ثبت نام شما با موفیت انجام شد.');
		} else if (response.statusCode == '400') {

			this.stopLoading();
			NotifyBox('error', translate(response.body.error.text));
		}
	}

	register(formValues) {
		(new swagger.UserApi())
			.userRegisterPost({'payloadData': formValues})
			.then(response => this.registerCallback(response));
	}

	loading() {
		this.loadingProgress = Ladda.create(document.querySelector('.register-form button'));
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
		this.register(formValues)
	};

	render() {
		return (<RegisterPTR SubmitCall={this.SubmitCall}/>);
	}
}

RegisterCTR.propTypes = {
	dispatch: PropTypes.func
};