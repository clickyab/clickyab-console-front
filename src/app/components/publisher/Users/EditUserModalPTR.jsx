import React, {Component, PropTypes} from "react";
import {reduxForm} from "redux-form";
import $ from "jquery";
import Select from "react-select";

class EditUserModalPTR extends Component {
	editMode = false;
	state = {
		roleValue: [],
	};

	getOptions() {
		let options = [];
		for (let i = 0; i < this.props.userAssignRoleList.length; i++) {
			options.push({
				value: this.props.userAssignRoleList[i].name,
				label: this.props.userAssignRoleList[i].name,
				id: this.props.userAssignRoleList[i].id
			})
		}

		return options;
	}

	componentDidMount() {
		$(document).on('shown.bs.modal', () => {
			this.setState(this.fillSelectBoxes());
			this.forceUpdate();
		});

		$(document).on('hide.bs.modal', () => {
			this.editMode = false;
			this.setState({roleValue: []});
		});
	}

	fillSelectBoxes() {
		if (!this.props.userAssignRoleData)
			return {
				roleValue: []
			};

		if (this.editMode)
			return this.state;

		let roleValue = [];
		for (let i = 0; i < this.props.userAssignRoleData.length; i++) {
			roleValue.push({
				value: this.props.userAssignRoleData[i].name,
				label: this.props.userAssignRoleData[i].name,
				id: this.props.userAssignRoleData[i].id
			});
		}

		this.firstEditModeData = {
			roleValue: roleValue
		};

		return this.firstEditModeData;
	}

	handleOnChangeRole(value) {
		this.editMode = true;
		this.setState({
			roleValue: value,
		});
		this.forceUpdate();
	}

	onEachRender({options, roleValue}) {
		let array = [];
		array.push.apply(array, roleValue);

		return options.filter(val => !array.includes(val));
	}

	render() {
		const {handleSubmit, SubmitEditUser} = this.props;
		let {roleValue} = this.state;
		let options = this.onEachRender({options: this.getOptions(), roleValue});
		return (
			<div className="edit-channel-modal modal fade fullscreen" id="editUserModal" tabIndex="-1" role="dialog"
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
										  SubmitEditUser(values, this.state.roleValue))}>

									<div>
										<div className="form-group">
											<Select
												options={options}
												multi={true}
												placeholder='انتخاب دسترسی...'
												value={roleValue}
												onChange={this.handleOnChangeRole.bind(this)}
											/>
										</div>
									</div>
									<button type="submit"
											className="btn btn-primary btn-lg edit-role-form btn-block edit-user-role">
										ویرایش رول
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

EditUserModalPTR.propTypes = {
	userAssignRoleList: PropTypes.array,
	userAssignRoleData: PropTypes.array,
	handleSubmit: PropTypes.func,
	SubmitEditUser: PropTypes.func
};

export default reduxForm({
	form: 'EditUserModalPTR'
})(EditUserModalPTR);