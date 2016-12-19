import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';

class CorporationUserPTR extends Component {

    componentDidMount() {

        this.PersonalForm = $('.corporation-form');
        this.PersonalForm.validate({
            rules: {
                first_name: {
                    required: true,
                },
                last_name: {
                    required: true,
                },

            },
            messages: {
                first_name: {
                    required: 'لطفا نام خود را وارد نمایید',
                },
                last_name: {
                    required: 'لطفا نام خانوادگی را وارد نمایید',
                },

            }
        });
    }


    render() {
        const {handleSubmit, SubmitCorporation} = this.props;
        return(
            <form className="horizontal-form corporation-form user-form" method="post">
                <div className="form-body">
                    <h3 className="form-section">اطلاعات شخص حقوقی</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">نام شرکت</label>
                                <Field component="input" type="text" id="title" name="title" className="form-control" placeholder="نام شرکت"/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group ">
                                <label className="control-label">کد اقتصادی</label>
                                <Field type="text" component="input" id="economic_code" name="economic_code" className="form-control" placeholder="کد اقتصادی"/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="control-label">شماره پروانه</label>
                            <Field type="text" component="input" id="register_code" name="register_code" className="form-control" placeholder="شماره پروانه"/>
                        </div>

                    </div>

                    <h3 className="form-section">اطلاعات تماس</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group ">
                                <label className="control-label">ایمیل</label>
                                <Field type="text" component="input" id="email_corporation" name="email" className="form-control" placeholder="ایمیل"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group ">
                                <label className="control-label">تلفن ثابت</label>
                                <Field type="text" component="input" id="cellphone_corporation" name="phone" className="form-control" placeholder="تلفن ثابت"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <select className="form-control" data-placeholder="انتخاب کشور" tabIndex="1" name="country_id">
                                <option value="male">تهران</option>
                                <option value="female">تبریز</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select className="form-control" data-placeholder="انتخاب شهر" tabIndex="1" name="province_id">
                                <option value="male">تهران</option>
                                <option value="female">تبریز</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <select className="form-control" data-placeholder="انتخاب استان" tabIndex="1" name="city_id">
                                <option value="male">تهران</option>
                                <option value="female">تبریز</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions margin-top-20">
                        <button type="submit" className="btn blue">
                            <i className="fa fa-check"/> ذخیره پروفایل</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'CorporationUserForm'
})(CorporationUserPTR);