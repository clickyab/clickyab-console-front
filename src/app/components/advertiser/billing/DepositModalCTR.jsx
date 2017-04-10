import React, {Component} from "react";
import DepositModalPTR from "./DepositModalPTR";
import {connect} from "react-redux";
import swagger from "../../../swagger/index";
import {updateAChannelFromListAction} from "../../../redux/actions/index";
import {dispatch} from "../../../functions/dispatch";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({depositData}) => ({depositData}))
export default class DepositModalCTR extends Component {
	editSubmit(formValues) {
		// const {id} = this.props.channelData;
		// sync(function *() {
		// 	loadingProgress = Ladda.create(document.querySelector('.edit-channel-form'));
		// 	loadingProgress.start();
		// 	const {error, data, response} = yield (new swagger.ChannelApi())
		// 		.channelIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});
        //
		// 	response.error = 'اطلاعات شما صحیح نمی‌باشد.';
		// 	response.text = 'اطلاعات شما با موفقیت ثبت شد.';
		// 	if (response.statusCode == 200) {
		// 		$('#editChannelModal').modal('hide');
		// 		loadingProgress.stop();
		// 		dispatch(updateAChannelFromListAction(data));
		// 	} else if (response.statusCode == '400') {
		// 		FailedBoxAlert(response)
		// 	}
		// 	ifInvalidToken(response);
		// });
	}

	// SubmitEditChannel = (formValues, form) => {
	// 	if (!form.valid())
	// 		return;
	// 	this.editSubmit(formValues)
	// };

	render() {
		const {form, depositData} = this.props;
		return (
			<DepositModalPTR  depositData={depositData}/>);
	}
}
