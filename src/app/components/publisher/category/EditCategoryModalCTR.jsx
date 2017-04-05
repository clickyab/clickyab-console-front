import React, {Component} from "react";
import EditCategoryModalPTR from "./EditCategoryModalPTR";
import swagger from "./../../../swagger/index";
import {FailedBoxAlert, SuccessBoxAlert} from "./../../../functions/notifications";
import {ifInvalidToken} from "./../../../functions/helpers";
import {dispatch} from "./../../../functions/dispatch";
import {sync} from "./../../../functions/sync";
import {select} from "./../../../functions/select";
import {connect} from "react-redux";
import {updateACategoryFromListAction} from "./../../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({categoryData}) => ({categoryData}))
export default class EditCategoryModalCTR extends Component {

	EditSubmit(formValues) {
		const {id} = this.props.categoryData;
		formValues.scope = 'channel';
		sync(function *() {
			loadingProgress = Ladda.create(document.querySelector('.edit-category-form'));
			loadingProgress.start();
			const {error, data, response} = yield (new swagger.CategoryApi())
				.categoryIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});

			if (response.statusCode == '200') {
				$('#editCategoryModal').modal('hide');
				loadingProgress.stop();
				dispatch(updateACategoryFromListAction(data));
				SuccessBoxAlert({
					error: 'اطلاعات شما صحیح نمی‌باشد.',
					text: 'اطلاعات شما با موفقیت ثبت شد.'
				});
			} else if (response.statusCode == '400') {
				FailedBoxAlert(response)
			}
			ifInvalidToken(response);
		})
	}

	SubmitEditCategory = (formValues, form) => {
		if (!form.valid)
			return;

		this.EditSubmit(formValues);
	};

	render() {
		const {form, categoryData} = this.props;
		return (<EditCategoryModalPTR form={form} categoryData={categoryData}
									  SubmitEditCategory={this.SubmitEditCategory}/>);
	}
}
