import React, {Component, PropTypes} from "react";
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
let $ = require('jquery');
let loadingProgress;

@connect(({roleData}) => ({roleData}))
export default class EditRoleModalCTR extends Component {
	normalizeFormValues(formValues, selfValue, parentValue, globalValue) {
		delete formValues.self;
		delete formValues.parent;
		delete formValues.global;

		let selfPermission = [];
		for (let i = 0; i < selfValue.length; i++) {
			selfPermission.push(selfValue[i].label);
		}

		let parentPermission = [];
		for (let i = 0; i < parentValue.length; i++) {
			parentPermission.push(parentValue[i].label);
		}

		let globalPermission = [];
		for (let i = 0; i < globalValue.length; i++) {
			globalPermission.push(globalValue[i].label);
		}

		formValues.perm = {
			self: selfPermission,
			parent: parentPermission,
			global: globalPermission
		};

		return formValues;
	}


	editSubmit(formValues, selfValue, parentValue, globalValue) {
		const {id} = this.props.roleData.role;
		sync(function *() {
			try {
				loadingProgress = Ladda.create(document.querySelector('.edit-role-form'));
				loadingProgress.start();
				const {data, response} = yield (new swagger.UserApi())
					.userRoleUpdateIdPut(id, select('user.token', 'no token'), {'payloadData': this.normalizeFormValues(formValues, selfValue, parentValue, globalValue)});

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
			} catch (e) {
				console.log(e);
			}

		}.bind(this));
	}

	SubmitEditRole = (formValues, form, selfValue, parentValue, globalValue) => {
		if (!form.valid())
			return;
		this.editSubmit(formValues, selfValue, parentValue, globalValue)
	};

	render() {
		const {form, roleData} = this.props;
		return (<EditRoleModalPTR permissions={this.props.permissions} form={form} roleData={roleData}
								  SubmitEditRole={this.SubmitEditRole}/>);
	}
}

EditRoleModalCTR.propTypes = {
	roleData: PropTypes.array,
	permissions: PropTypes.array,
	form: PropTypes.object,
};