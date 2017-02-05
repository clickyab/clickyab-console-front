import React, {Component} from "react";
import EditRoleModalPTR from "./EditRoleModalPTR";
import {connect} from "react-redux";
import swagger from "../../../swagger/index";
import {updateARoleFromListAction} from "../../../redux/actions/index";
import {dispatch} from "../../../functions/dispatch";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({roleData}) => ({roleData}))
export default class EditRoleModalCTR extends Component {
	editSubmit(formValues) {
		const {id} = this.props.roleData;
		sync(function *() {
			loadingProgress = Ladda.create(document.querySelector('.edit-role-form'));
			loadingProgress.start();
			const {data, response} = yield (new swagger.UserApi())
				.userRoleUpdateIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});

			if (response.statusCode == 200) {
				$('#editRoleModal').modal('hide');
				loadingProgress.stop();
				dispatch(updateARoleFromListAction(data));
			} else if (response.statusCode == '400') {
				FailedBoxAlert(response)
			}

			ifInvalidToken({
				error: 'اطلاعات شما صحیح نمی‌باشد.',
				text: 'اطلاعات شما با موفقیت ثبت شد.'
			});
		});
	}

	SubmitEditRole = (formValues, form) => {
		if (!form.valid())
			return;
		this.editSubmit(formValues)
	};

	render() {
		const {form, roleData} = this.props;
		return (<EditRoleModalPTR permissions={this.props.permissions} form={form} roleData={roleData} SubmitEditRole={this.SubmitEditRole}/>);
	}
}
