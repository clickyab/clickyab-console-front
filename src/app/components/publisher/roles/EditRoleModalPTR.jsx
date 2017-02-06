import React, {Component} from "react";
import {Field, reduxForm, change} from "redux-form";
import $ from "jquery";
import {shallowEqual} from "./../../../3rd/shallowEqual";
import {dispatch} from "../../../functions/dispatch";
import SelectPermissionCTR from './SelectPermissionCTR';

class EditRoleModalPTR extends Component {
	editRoleForm;
	state = {
		validation: true,

		multi: true,
		selfValue: [],
		parentValue: [],
		globalValue: [],
		options: [],
		self: true,
		parent: true,
		global: true
	};

	setSelectPermission(key, value) {
		this.setState({[key]: value});
	}

	shouldComponentUpdate(nextProps) {
		if (!shallowEqual(this.props, nextProps)) {
			for (let key in nextProps.roleData.role) {
				dispatch(change(nextProps.form, key, nextProps.roleData.role[key]))
			}

			return true;
		}

		return false;
	}

	componentDidMount() {
		this.editRoleForm = $("#editRoleForm");
		this.editRoleForm.validate({
			rules: {
				link: {
					required: true,
					url: true
				},
				name: {
					required: true,
				},
			},
			messages: {
				link: {
					required: 'لطفا لینک کانال را وارد نمایید',
					url: 'لطفا یک آدرس اینترنتی معتبر با http و یا https وارد نمایید'
				},
				name: {
					required: 'لطفا نام کانال را وارد نمایید',
				},
			}
		});
	}

	render() {
		console.log(this.state);
		const {handleSubmit, SubmitEditRole} = this.props;
		let {selfValue, parentValue, globalValue} = this.state;
		return (
			<div className="edit-role-modal modal fade fullscreen" id="editRoleModal" tabIndex="-1" role="dialog"
				 aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<div className="padding-tb-15">
								<img className="closebt" src="/img/closebtn.svg" data-dismiss="modal"
									 aria-hidden="true"/>
							</div>
						</div>
						<div className="modal-body text-center">
							<div className="col-md-4 col-md-offset-4">
								<div className="modal-title text-center">
									<h3/>
								</div>
								<form role="form" action="" id="editRoleForm" method="post"
									  className="add-role-form white"
									  onSubmit={handleSubmit((values) => SubmitEditRole(values, this.editRoleForm))}>
									<div className="form-group">
										<label htmlFor="link">نام رول</label>
										<Field component="input" type="text" name="name" placeholder="نام رول"
											   className="form-control input-lg" id="name"/>
									</div>

									<div className="form-group">
										<label htmlFor="description">توضیحات رول</label>
										<Field component="textarea" name="description"
											   placeholder="توضیحات رول"
											   className="form-control input-lg" id="description"/>
									</div>


									<SelectPermissionCTR selectPermission={this.state}
														 setSelectPermission={this.setSelectPermission.bind(this)}
														 permissions={this.props.permissions}/>
									<button type="submit"
											className="btn btn-primary btn-lg edit-role-form btn-block">ذخیره
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'EditRoleModalPTR'
})(EditRoleModalPTR);