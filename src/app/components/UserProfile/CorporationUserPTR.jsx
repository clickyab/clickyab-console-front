import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {select} from "../../functions/select";
import {getEmail} from "./../../redux/helpers";
import SelectLocationCTR from "./../location/SelectLocationCTR";
import {dispatch} from "../../functions/dispatch";
import {change} from "redux-form/lib/actions";

class CorporationUserPTR extends Component {
	CorporationForm;

	handleInitialize() {
		const initData = select("user.corporation", {});
		initData.email = getEmail();
		for (let key in initData) {
			dispatch(change("CorporationUserForm", key, initData[key]));
		}
	}

	componentDidMount() {
		this.handleInitialize();
		this.CorporationForm = $('.corporation-form');
		this.CorporationForm.validate({
			rules: {
				title: {
					required: true,
				},
				register_code: {
					required: true,
				},
			},
			messages: {
				title: {
					required: 'لطفا نام شرکت را وارد نمایید',
				},
				register_code: {
					required: 'لطفا شماره پروانه خود را وارد نمایید',
				},
			}

		});
	}


	render() {
		const {handleSubmit, SubmitCorporationUser} = this.props;
		return (
			<form className="horizontal-form corporation-form user-form" method="post"
				  onSubmit={handleSubmit((values) => SubmitCorporationUser(values, this.CorporationForm))}>
				<div className="form-body">
					<h3 className="form-section">اطلاعات شخص حقوقی</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">نام شرکت</label>
								<Field component="input" type="text" id="title" name="title" className="form-control"
									   placeholder="نام شرکت"/>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">کد اقتصادی</label>
								<Field type="text" component="input" id="economic_code" name="economic_code"
									   className="form-control" placeholder="کد اقتصادی"/>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">شماره پروانه</label>
								<Field type="text" component="input" id="register_code" name="register_code"
									   className="form-control" placeholder="شماره پروانه"/>
							</div>
						</div>

					</div>

					<h3 className="form-section">اطلاعات تماس</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">ایمیل</label>
								<Field type="text" component="input" disabled id="email_corporation" name="email"
									   className="form-control" placeholder="ایمیل"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">تلفن ثابت</label>
								<Field type="text" component="input" id="cellphone_corporation" name="phone"
									   className="form-control" placeholder="تلفن ثابت"/>
							</div>
						</div>
					</div>

					<SelectLocationCTR form='CorporationUserForm'/>
					<div className="form-actions margin-top-20">
						<button type="submit" className="btn blue">
							<i className="fa fa-check"/> ذخیره پروفایل
						</button>
					</div>
				</div>
			</form>
		)
	}
}

export default reduxForm({
	form: 'CorporationUserForm'
})(CorporationUserPTR);