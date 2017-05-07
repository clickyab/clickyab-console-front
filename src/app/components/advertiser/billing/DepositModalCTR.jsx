import React, {Component} from "react";
import DepositModalPTR from "./DepositModalPTR";
import {connect} from "react-redux";
import swagger from "../../../swagger/index";
import {UpdateDepositData} from "../../../redux/actions/index";
import {dispatch} from "../../../functions/dispatch";
import {NotifyBox} from "../../../functions/notifications";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({depositData}) => ({depositData}))
export default class DepositModalCTR extends Component {
    SubmitFunction(formValues) {
		const {id} = this.props.depositData;
		sync(function *() {
			loadingProgress = Ladda.create(document.querySelector('.change-deposit-btn'));
			loadingProgress.start();
			const {error, data, response} = yield (new swagger.BillingApi())
				.billingListDepositIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});
			if (response.statusCode == 200) {
				$('#DepositModal').modal('hide');
				loadingProgress.stop();
				dispatch(UpdateDepositData(data));
			} else if (response.statusCode == '400') {
				NotifyBox("error","اختلالی به وجود آمده است لطفا دوباره تلاش کنید")
			}
		});
	}

	SubmitDepositForm = (formValues, form) => {
		if (!form.valid())
			return;
		this.SubmitFunction(formValues)
	};

	render() {
		const {depositData} = this.props;
		return (
			<DepositModalPTR  depositData={depositData} SubmitDepositForm={this.SubmitDepositForm}/>);
	}
}
