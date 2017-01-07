import React, {Component} from "react";
import AddCategoryModalPTR from "./AddCategoryModalPTR";
import swagger from './../../swagger/index';
import {FailedBoxAlert, SuccessBoxAlert} from "./../../functions/notifications";
import {ifInvalidToken} from "./../../functions/helpers";
import {select} from "./../../functions/select";
import {sync} from "./../../functions/sync";
import {dispatch} from "./../../functions/dispatch";
import {categoryListAction} from "./../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

class AddCategoryModalCTR extends Component {

	addCategorySubmit(formValues) {
		formValues.scope = 'channel';
		sync(function*() {
			loadingProgress = Ladda.create(document.querySelector('button.add-category-form'));
			loadingProgress.start();
			const {response} = yield (new swagger.CategoryApi())
				.categoryPost(select("user.token", "no token"), {'payloadData': formValues});

			if (response.statusCode == 200) {
				$('#addCategoryModal').modal('hide');
				loadingProgress.stop();
				const {data} = yield(new swagger.CategoryApi()).categoryListGet(select('user.token'), {def: true});
				dispatch(categoryListAction(data));
				SuccessBoxAlert(response.text);
			} else if (response.statusCode == '400') {
				FailedBoxAlert(response)
			}
			ifInvalidToken(response);
		});
	}

	SubmitAddCategory = (formValues, form) => {
		if(!form.valid())
			return;
		this.addCategorySubmit(formValues)
	};

	render() {
		return (<AddCategoryModalPTR SubmitAddCategory={this.SubmitAddCategory}/>);
	}
}

export default AddCategoryModalCTR;