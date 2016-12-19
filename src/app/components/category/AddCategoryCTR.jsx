import React, {Component} from "react";
import AddCategoryPTR from "./AddCategoryPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {getToken} from "../../redux/helpers";

@connect()
class AddCategoryCTR extends Component {
	SubmitCall = (values, form) => {
		values.scope = "channel";
		(new swagger.CategoryApi())
			.categoryCreatePost(getToken(), {
				'payloadData': values
			}, function (error, data, response) {
				console.log(error, data, response)
			})
	};

	render() {
		return (<AddCategoryPTR SubmitCall={this.SubmitCall}/>);
	}
}

export default AddCategoryCTR;