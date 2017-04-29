import React, {Component, PropTypes} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {assignRoleUserData} from "../../../redux/actions/index";
import {sync} from "../../../functions/sync";
import {AlertBox} from "../../../functions/notifications";
import {dispatch} from "../../../functions/dispatch";
let Ladda = require('ladda/js/ladda');
let $ = require("jquery");
let loadingProgress;

export default class EditUserButton extends Component {
	editElementBtn;

	edit(event) {
		loadingProgress = Ladda.create(this.editElementBtn);
		loadingProgress.start();
		event.preventDefault();
		let {id} = this.props;
		try {
			sync(function*() {
				const {data, response} = yield (new swagger.UserApi())
					.userRoleUserIdGet(id, select('user.token', 'no token'));

				if (response.statusCode == '200') {
					$('#editUserModal').modal();
					loadingProgress.stop();
					data.userId = id;
					dispatch(assignRoleUserData(data));
				} else if (response.statusCode == '400') {
					AlertBox('error', 'اطلاعات شما صحیح نمی‌باشد.');
				}

			});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<button key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
					className="btn btn-info btn-xs blue edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
					onClick={(event) => this.edit(event)}>ویرایش</button>
		);
	}
}

EditUserButton.propTypes = {
	id: PropTypes.number
};