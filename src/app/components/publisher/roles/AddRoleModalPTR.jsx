import React, {Component} from "react";
import {Field, reduxForm, reset} from "redux-form";
import $ from "jquery";
import SelectPermissionCTR from "./SelectPermissionCTR";
import {dispatch} from "../../../functions/dispatch";
let Ladda = require('ladda/js/ladda');

class AddRoleModalPTR extends Component {
	addRoleForm;
	selectPermission = {};
	state = {
		validation: true,

		multi: true,
		selfValue: [],
		parentValue: [],
		globalValue: [],
		options: [],
		selfCheckbox: false,
		parentCheckbox: false,
		globalCheckbox: false
	};

	setSelectPermission(key, value) {
		this.setState({[key]: value});
	}

	setSelectToEmpty() {
		this.setState({
			selfValue: [],
			parentValue: [],
			globalValue: [],
			selfCheckbox: false,
			parentCheckbox: false,
			globalCheckbox: false
		});
	}

	componentDidMount() {
		this.props.setRemoveSelectBoxesCallback(this.setSelectToEmpty.bind(this));

		this.addRoleForm = $("#addRoleForm");
		this.addRoleForm.validate({
			rules: {
				description: {
					required: true,
					minlength: 4
				},
				name: {
					required: true,
					minlength: 4
				},
			},
			messages: {
				description: {
					required: 'لطفا توضیحات رول را وارد نمایید',
					minlength: 'توضیحات حداقل می‌بایست 4 کاراکتر باشد'
				},
				name: {
					required: 'لطفا نام رول را وارد نمایید',
					minlength: 'نام  حداقل می‌بایست 4 کاراکتر باشد'
				},
			}
		});
	}

	onCloseModal() {
		$('#addRoleModal').modal('hide');
		dispatch(reset('AddRoleModalPTR'));
		this.setSelectToEmpty();
		Ladda.create(document.querySelector('button.add-role-form')).stop();
	}

	render() {
		const {handleSubmit, SubmitAddRole} = this.props;
		let {selfValue, parentValue, globalValue} = this.state;
		return (
			<div className="add-role-modal modal fade fullscreen" id="addRoleModal" tabIndex="-1" role="dialog"
				 aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<div className="padding-tb-15">
								<img className="closebt" onClick={this.onCloseModal.bind(this)} src="/img/closebtn.svg"
									 data-dismiss="modal"
									 aria-hidden="true"/>
							</div>
						</div>
						<div className="modal-body text-center">
							<div className="col-md-4 col-md-offset-4">
								<div className="modal-title text-center">
									<h3/>
								</div>
								<form role="form" action="" id="addRoleForm" method="post"
									  className="add-role-form white"
									  onSubmit={handleSubmit((values) => SubmitAddRole(values, this.addRoleForm, selfValue, parentValue, globalValue))}>
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

									<div className="form-group">
										<div className="mt-checkbox-inline">
											<SelectPermissionCTR selectPermission={this.state}
																 setSelectPermission={this.setSelectPermission.bind(this)}
																 permissions={this.props.permissions}/>
										</div>
									</div>
									<button type="submit"
											className="btn btn-primary btn-lg add-role-form btn-block">ذخیره

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
	form: 'AddRoleModalPTR'
})(AddRoleModalPTR);
