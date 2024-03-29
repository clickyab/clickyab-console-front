import React, {Component, PropTypes} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {dispatch} from "../../functions/dispatch";
import {getEmail} from "./../../redux/helpers";
import {select} from "../../functions/select";
import SelectLocationCTR from "./../../components/location/SelectLocationCTR";
import moment from "moment-jalali";
import {change} from "redux-form/lib/actions";
import DatePicker from "react-datepicker2";
moment.loadPersian();


class PersonalUserPTR extends Component {
	PersonalForm;
	state = {
        birthday: ((select("user.personal.birthday")) != null ? moment([select("user.personal", {}, true).birthday]) : moment())
	};

	handleInitialize() {
		const initData = select("user.personal", {}, true);
		initData.email = getEmail();
		for (let key in initData) {
			dispatch(change("PersonalUserForm", key, initData[key]));
		}
	}

	componentDidMount() {
		this.handleInitialize();
		this.PersonalForm = $('.personal-form');
		this.PersonalForm.validate({
			rules: {
				first_name: {
					required: true,
					minlength: 3
				},
				last_name: {
					required: true,
					minlength: 3
				},
				gender: {
					required: true
				}

			},
			messages: {
				first_name: {
					required: 'لطفا نام خود را وارد نمایید',
					minlength: "نام حداقل باید ۳ کاراکتر باشد"
				},
				last_name: {
					required: 'لطفا نام خانوادگی را وارد نمایید',
					minlength: "نام خانوادگی حداقل باید ۳ کاراکتر باشد"
				},
				gender: {
					required: 'لطفا جنسیت خود را وارد نمایید',
				},

			}
		});
	}


	render() {
		const {handleSubmit, SubmitPersonalUser} = this.props;
		return (
			<form className="horizontal-form personal-form user-form" method="post"
				  onSubmit={handleSubmit((values) => SubmitPersonalUser(values, this.PersonalForm))}>
				<div className="form-body">
					<h3 className="form-section">اطلاعات شخص حقیقی</h3>
					<div className="note note-success">
						<h6>فیلد‌های <span className="text-danger"> *</span>(ستاره‌دار) اجباری می‌باشند.</h6>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">نام <span className="text-danger">*</span></label>
								<Field component="input" type="text" id="first_name" name="first_name"
									   className="form-control" placeholder="نام"/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">نام خانوادگی <span
									className="text-danger">*</span></label>
								<Field component="input" type="text" id="last_name" name="last_name"
									   className="form-control" placeholder="نام خانوادگی"/>
							</div>
						</div>

					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">تاریخ تولد</label>
								<DatePicker
									className="form-control"
									onChange={value => {
										dispatch(change("PersonalUserForm", "birthday", moment(value).format()));
										this.setState({value})
									}}
									isGregorian={false}
									timePicker={false}
									value={this.state.birthday}
								/>
								<Field type="hidden" component="input" id="birthday" name="birthday"
									   className="form-control" placeholder="تاریخ تولد"/>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group">
								<label className="control-label">جنسیت <span className="text-danger">*</span></label>
								<Field className="form-control" component="select" data-placeholder="جنسیت" tabIndex="1"
									   name="gender"
									   id="gender">
									<option value="">جنسیت خود را انتخاب کنید</option>
									<option value="male">مرد</option>
									<option value="female">زن</option>
								</Field>
							</div>
						</div>

					</div>

					<div className="row">
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">کد ملی</label>
								<Field type="text" component="input" id="national_code" name="national_code"
									   className="form-control" placeholder="کد ملی"/>
							</div>
						</div>

					</div>

					<h3 className="form-section">اطلاعات تماس</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">ایمیل</label>
								<Field type="text" component="input" id="email" name="email"
									   className="form-control" placeholder="ایمیل" disabled/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group ">
								<label className="control-label">شماره همراه</label>
								<Field type="text" component="input" id="cellphone" name="cellphone"
									   className="form-control" placeholder="شماره همراه"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label>آدرس</label>
								<Field component="textarea" name="address" id="address" className="form-control"
									   rows="3"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label>کد پستی</label>
								<Field type="text" className="form-control" component="input" name="zip_code"
									   id="zip_code" placeholder="کد پستی"/>
							</div>
						</div>

						<div className="col-md-6">
							<div className="form-group">
								<label>تلفن ثابت</label>
								<Field type="text" className="form-control" component="input" name="phone"
									   id="phone" placeholder="تلفن ثابت"/>
							</div>
						</div>

					</div>

					<SelectLocationCTR form='PersonalUserForm'/>
					<div className="form-actions right margin-top-20">
						<button type="submit" className="btn blue">
							<i className="fa fa-check"/> ذخیره پروفایل
						</button>
					</div>
				</div>
			</form>
		)
	}
}

PersonalUserPTR.propTypes = {
	handleSubmit: PropTypes.func,
	SubmitPersonalUser: PropTypes.func
};

export default reduxForm({
	form: 'PersonalUserForm'
})(PersonalUserPTR);