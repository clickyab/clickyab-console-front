import React, {Component, PropTypes} from "react";
import CorporationUserPTR from "./CorporationUserPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {FailedBoxAlert, NotifyBox, SuccessBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
import {deletePersonalInformation, updateCorporationInformation} from "../../redux/actions/user";
import {select} from "../../functions/select";
let Ladda = require('ladda/js/ladda');

@connect()
export default class CorporationUserCTR extends Component {
	loadingProgress;

	editProfileSuccessfullyDispatchers(user) {
		let {dispatch} = this.props;

		dispatch(updateCorporationInformation(user));
		if (select('user.personal') != null) {
			dispatch(deletePersonalInformation());
		}
		dispatch(updateLocalStorageAction());
	}

	CorporationUserCallback({data, response}) {
		if (response.statusCode == '200') {
			this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
			this.loadingProgress.stop();
			SuccessBoxAlert({text: 'اطلاعات شما با موفقیت ثبت شد.'});
			NotifyBox('success', 'اطلاعات شما با موفقیت ثبت شد.', 8000);
		} else if (response.statusCode == '400') {
			this.stopLoading();
			FailedBoxAlert({error: 'اطلاعات شما صحیح نمی‌باشد.'});
			NotifyBox('error', 'اطلاعات شما صحیح نمی‌باشد.', 8000);
		}
		ifInvalidToken(response);
	}

	CorporationCall(formValues) {
		(new swagger.UserApi())
			.userProfilePost(getToken(),
				{'payloadData': {"corporation": formValues}})
			.then(response => this.CorporationUserCallback(response));
	}

	loading() {
		this.loadingProgress = Ladda.create(document.querySelector('.corporation-form button[type=submit]'));
		this.loadingProgress.start();
	}

	stopLoading() {
		if (this.loadingProgress)
			this.loadingProgress.stop();
	}

	SubmitCorporationUser = (formValues, form) => {
		if (!form.valid())
			return;

		this.loading();
		this.CorporationCall(formValues)
	};

	render() {
		return (<CorporationUserPTR SubmitCorporationUser={this.SubmitCorporationUser}/>);
	}
}

CorporationUserCTR.propTypes = {
	dispatch: PropTypes.func
};