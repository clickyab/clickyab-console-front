import React, {Component} from "react";
import {change, Field, reduxForm} from "redux-form";
import $ from "jquery";
import {shallowEqual} from "./../../../3rd/shallowEqual";
import {dispatch} from "../../../functions/dispatch";
import Select from "react-select";

class EditRoleModalPTR extends Component {
	editRoleForm;
	editMode = false;
	initialized = false;
	state = {
		validation: true,

		selfValue: [],
		parentValue: [],
		globalValue: [],
		selfCheckbox: false,
		parentCheckbox: false,
		globalCheckbox: false
	};

	getOptions() {
		let options = [];
		for (let permission in this.props.permissions) {
			options.push({value: this.props.permissions[permission], label: this.props.permissions[permission]});
		}

		return options;
	}

	toggleDisabled(e) {
		this.setState({[e.target.id]: e.target.checked});
		this.editMode = true;
		this.forceUpdate();
	}

	shouldComponentUpdate(nextProps) {
		if (!shallowEqual(this.props, nextProps) && !this.initialized) {
			this.initialized = true;
			for (let key in nextProps.roleData.role) {
				dispatch(change(nextProps.form, key, nextProps.roleData.role[key]))
			}

			return true;
		}

		return false;
	}

	fillSelectBoxes() {
		if (!this.props.roleData.perm)
			return {
				selfValue: [],
				parentValue: [],
				globalValue: [],
				selfCheckbox: false,
				parentCheckbox: false,
				globalCheckbox: false
			};

		if (this.editMode)
			return this.state;

		let selfPermission = [];
		for (let key in this.props.roleData.perm.self) {
			selfPermission.push({value: key, label: key});
		}

		let parentPermission = [];
		for (let parentKey in this.props.roleData.perm.parent) {
			parentPermission.push({value: parentKey, label: parentKey});
		}

		let globalPermission = [];
		for (let globalKey in this.props.roleData.perm.global) {
			globalPermission.push({value: globalKey, label: globalKey});
		}

		this.firstEditModeData = {
			selfValue: selfPermission,
			parentValue: parentPermission,
			globalValue: globalPermission,
			selfCheckbox: selfPermission.length > 0,
			parentCheckbox: parentPermission.length > 0,
			globalCheckbox: globalPermission.length > 0
		};

		return this.firstEditModeData;
	}

	check() {
		let {selfCheckbox, parentCheckbox, globalCheckbox} = this.fillSelectBoxes();

		if (selfCheckbox)
			dispatch(change('EditRoleModalPTR', 'self', 'self'));
		if (parentCheckbox)
			dispatch(change('EditRoleModalPTR', 'parent', 'parent'));
		if (globalCheckbox)
			dispatch(change('EditRoleModalPTR', 'global', 'global'));
	}

	componentDidMount() {
		$(document).on('shown.bs.modal', () => {
			this.setState(this.fillSelectBoxes());
			if (this.editMode == false) {
				this.check()
			}
			this.forceUpdate();
		});

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

	handleOnChangeSelf(value) {
		this.editMode = true;
		this.setState({
			selfValue: value,
			selfCheckbox: true
		});
		this.forceUpdate();
	}

	handleOnChangeParent(value) {
		this.editMode = true;
		this.setState({
			parentValue: value,
			parentCheckbox: true
		});
		this.forceUpdate();
	}

	handleOnChangeGlobal(value) {
		this.editMode = true;
		this.setState({
			globalValue: value,
			globalCheckbox: true
		});
		this.forceUpdate();
	}

	onEachRender({options, selfValue, parentValue, globalValue}) {
		let array = [];
		array.push.apply(array, selfValue);
		array.push.apply(array, parentValue);
		array.push.apply(array, globalValue);

		return options.filter(val => !array.includes(val));
	}

	render() {
		const {handleSubmit, SubmitEditRole} = this.props;
		let {
			selfValue, parentValue, globalValue, selfCheckbox, parentCheckbox, globalCheckbox
		} = this.state;
		let options = this.onEachRender({options: this.getOptions(), selfValue, parentValue, globalValue});
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
									  onSubmit={handleSubmit((values) =>
										  SubmitEditRole(values, this.editRoleForm, this.state.selfValue, this.state.parentValue, this.state.globalValue))}>
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


									<div>
										<div className="form-group">
											<label className="mt-checkbox">
												<Field component="input" id="selfCheckbox" value="self"
													   onClick={this.toggleDisabled.bind(this)}
													   name="self"
													   type="checkbox"/> خودم
												<span/>
											</label>
											<Select
												disabled={!selfCheckbox}
												multi={true}
												options={options}
												onChange={this.handleOnChangeSelf.bind(this)}
												value={selfValue}
												placeholder='انتخاب دسترسی...'
											/>
										</div>
										<div className="form-group">
											<label className="mt-checkbox">
												<Field component="input" id="parentCheckbox" value="parent"
													   onClick={this.toggleDisabled.bind(this)}
													   name="parent"
													   type="checkbox"/> PARENT
												<span/>
											</label>
											<Select
												disabled={!parentCheckbox}
												multi={true}
												options={options}
												onChange={this.handleOnChangeParent.bind(this)}
												value={parentValue}
												placeholder='انتخاب دسترسی...'
											/>
										</div>
										<div className="form-group">
											<label className="mt-checkbox">
												<Field component="input" id="globalCheckbox" value="global"
													   onClick={this.toggleDisabled.bind(this)}
													   name="global"
													   type="checkbox"/> Global
												<span/>
											</label>
											<Select
												disabled={!globalCheckbox}
												multi={true}
												options={options}
												onChange={this.handleOnChangeGlobal.bind(this)}
												value={globalValue}
												placeholder='انتخاب دسترسی...'
											/>
										</div>
									</div>

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