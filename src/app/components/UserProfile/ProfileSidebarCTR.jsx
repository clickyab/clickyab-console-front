import React, {Component} from "react";
import ProfileSidebarPTR from "./ProfileSidebarPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction, asyncRemoveLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {getToken} from "../../redux/helpers";
import {logout} from "../../redux/actions/login";
import {navigate} from "../../functions/navigate";
let Ladda = require('ladda/js/ladda');

@connect(({user}) => ({user}))
export default class ProfileSidebarCTR extends Component {
	loadingProgress;

	editProfileSuccessfullyDispatchers(user) {
		let {dispatch} = this.props;

		dispatch(logout(user));
		dispatch(updateUserInformation(user));
		dispatch(updateLocalStorageAction());
		dispatch(asyncRemoveLocalStorageAction());
		navigate('/v1/login');
	}


	LogoutCallback({error, data, response}) {
		if (response.statusCode == '200') {
			this.editProfileSuccessfullyDispatchers(Object.assign({}, data));

			SuccessBoxAlert(response);
		} else if (response.statusCode == '400') {

			this.stopLoading();
			FailedBoxAlert(response);
		}
	}

	LogoutCall() {
		(new swagger.UserApi())
			.userLogoutGet(getToken())
			.then(response => this.LogoutCallback(response));
	}

	loading() {
		this.loadingProgress = Ladda.create(document.querySelector('button.logout-btn'));
		this.loadingProgress.start();
	}

	stopLoading() {
		if (this.loadingProgress)
			this.loadingProgress.stop();
	}

	SubmitLogout = () => {
		this.loading();
		this.LogoutCall()
	};

	render() {
		const {UserName} = this.props;
		return (<ProfileSidebarPTR UserName={UserName} SubmitLogout={this.SubmitLogout}/>);
	}
}
