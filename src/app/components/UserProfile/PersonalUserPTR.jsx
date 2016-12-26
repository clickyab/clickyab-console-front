import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {store} from "./../../redux/store";
import {getEmail} from './../../redux/helpers'
import {select} from '../../functions/select'
import moment from 'moment-jalali';
var daterangepicker = require('daterangepicker');

moment.loadPersian();



class PersonalUserPTR extends Component {
    PersonalForm;

    handleInitialize() {
        const initData = select("user.personal", {}, true);
        initData.email = getEmail();
        this.props.initialize(initData);
    }

    componentDidMount() {
        console.log(moment.locale());
        this.handleInitialize();
        this.PersonalForm = $('.personal-form');
        this.PersonalForm.validate({
            rules: {
                first_name: {
                    required: true,
                },
                last_name: {
                    required: true,
                },
                gender: {
                    required: true
                }

            },
            messages: {
                first_name: {
                    required: 'لطفا نام خود را وارد نمایید',
                },
                last_name: {
                    required: 'لطفا نام خانوادگی را وارد نمایید',
                },
                gender: {
                    required: 'لطفا جنسیت خود را وارد نمایید',
                },

            }
        });

        $('#birthday').daterangepicker({
            "singleDatePicker": true,
            "showCustomRangeLabel": false,
            "startDate": moment("12/20/2016"),
            "endDate":  moment("12/26/2016")
        }, function(start, end, label) {
            console.log("New date range selected: ' + moment(start).format('YYYY-MM-DD') + ' to ' + moment(end).format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
        });
    }


    render() {
        const {handleSubmit, SubmitPersonalUser} = this.props;
        return (
            <form className="horizontal-form personal-form user-form" method="post"
                  onSubmit={handleSubmit((values) => SubmitPersonalUser(values, this.PersonalForm))}>
                <div className="form-body">
                    <h3 className="form-section">اطلاعات شخص حقیقی</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">نام</label>
                                <Field component="input" type="text" id="first_name" name="first_name"
                                       className="form-control" placeholder="نام"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">نام خانوادگی</label>
                                <Field component="input" type="text" id="last_name" name="last_name"
                                       className="form-control" placeholder="نام خانوادگی"/>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">تاریخ تولد</label>
                                <Field type="text" component="input" id="birthday" name="birthday"
                                       className="form-control" placeholder="تاریخ تولد"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">جنسیت</label>
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
                                <Field type="text" component="input" id="email_personal" name="email"
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
                                <textarea name="address_personal" id="address_personal" className="form-control"
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
                                <Field type="text" className="form-control" component="input" name="phone_personal"
                                       id="phone_personal" placeholder="تلفن ثابت"/>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>شهر</label>
                                <select className="form-control country_id" data-placeholder="انتخاب کشور" tabIndex="1"
                                        name="country_id">
                                    <option value="male">ایران</option>
                                    <option value="female">استرالیا</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>شهر</label>
                                <select className="form-control province_id" data-placeholder="انتخاب شهر" tabIndex="1"
                                        name="province_id">
                                    <option value="male">تهران</option>
                                    <option value="female">تبریز</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>شهر</label>
                                <select className="form-control city_id" data-placeholder="انتخاب استان" tabIndex="1"
                                        name="city_id">
                                    <option value="male">تهران</option>
                                    <option value="female">تبریز</option>
                                </select>
                            </div>
                        </div>
                    </div>
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

export default reduxForm({
    form: 'PersonalUserForm'
})(PersonalUserPTR);