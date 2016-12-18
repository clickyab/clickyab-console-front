import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'

class UserProfilePTR extends Component {
    form;
    state = {
        validation: true
    };

    componentDidMount() {


        $("input[name=user-type]").change(function(event) {
            if (($(this).not(":checked"))) {
                $(".user-form").css("display","none");
            }
                if ( $(this).is(":checked") && ($(this).val() == "personal")) {
                    $(".user-form").hide();
                    $(".personal-form").fadeIn();
                    $('html, body').animate({scrollTop:$("."+$(this).val()+"-form").position().top}, 'slow');
                }
                else if( $(this).is(":checked") && ($(this).val() == "corporation")) {
                    $(".user-form").hide();
                    $(".corporation-form").fadeIn();
                    $('html, body').animate({scrollTop:$("."+$(this).val()+"-form").position().top}, 'slow');
                }
        }).trigger('change');

        $(".down-arrow , .up-arrow").on("click", function(a) {

        });


        this.form = $('.personal-form');
        this.form.validate({
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
        const {handleSubmit, SubmitCall} = this.props;

        return (
            <div className="page-content">
                <h1 className="page-title"> ویرایش پروفایل
                </h1>

                <div className="row">
                    <div className="col-md-12">
                        <div className="profile-sidebar">
                            <div className="portlet light profile-sidebar-portlet ">
                                <div className="profile-userpic">
                                    <img src="/img/pages/media/profile/profile_user.jpg" className="img-responsive" alt=""/> </div>
                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name"> میلاد حیدری </div>
                                </div>
                                <div className="profile-userbuttons">
                                    <button type="button" className="btn btn-circle red btn-sm">خروج</button>
                                </div>
                                <div className="profile-usermenu">
                                    <ul className="nav">
                                        <li>
                                            <a href="page_user_profile_1.html">
                                                <i className="icon-home"/> شارژ حساب </a>
                                        </li>
                                        <li className="active">
                                            <a href="page_user_profile_1_account.html">
                                                <i className="icon-settings"/> برداشت حساب </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="portlet light ">
                                        <div className="portlet-title tabbable-line">
                                            <div className="caption caption-md">
                                                <i className="icon-globe theme-font hide"/>
                                                <span className="caption-subject font-blue-madison bold uppercase">اطلاعات پروفایل</span>
                                            </div>
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <a href="#tab_1_1" data-toggle="tab">ویرایش و تکمیل اطلاعات</a>
                                                </li>
                                                <li>
                                                    <a href="#tab_1_2" data-toggle="tab">Sesstion های فعال</a>
                                                </li>
                                                <li>
                                                    <a href="#tab_1_3" data-toggle="tab">تغییر کلمه عبور</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="portlet-body">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="tab_1_1">
                                                    <div className="row">
                                                        <div className="col-md-12 col-xs-12">
                                                            <div className="mt-element-ribbon bg-grey-steel">
                                                                <div className="ribbon ribbon-color-primary uppercase">انتخاب نوع شخص</div>
                                                                <p className="ribbon-content">حقیقی
                                                                    یا حقوقی بودن کاربری خود را در ابتدا مشخص کنید و سپس فرم را تکمیل نمایید
                                                                    <br/>
                                                                    <br/>
                                                                    <div className="form-group form-md-radios">
                                                                        <div className="md-radio-list">
                                                                            <div className="md-radio">
                                                                                <input type="radio" id="radio_personal" name="user-type" value="personal" className="md-radiobtn"/>
                                                                                <label htmlFor="radio_personal">
                                                                                    <span className="inc"/>
                                                                                    <span className="check"/>
                                                                                    <span className="box"/> حقیقی </label>
                                                                            </div>
                                                                            <div className="md-radio">
                                                                                <input type="radio" id="radio_corporation" name="user-type" value="corporation" className="md-radiobtn"/>
                                                                                <label htmlFor="radio_corporation">
                                                                                    <span className="inc"/>
                                                                                    <span className="check"/>
                                                                                    <span className="box"/> حقوقی </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <form className="horizontal-form personal-form user-form" method="post" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                                        <div className="form-body">
                                                            <h3 className="form-section">اطلاعات شخص حقیقی</h3>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-label">نام</label>
                                                                        <input type="text" id="first_name" name="first_name" className="form-control" placeholder="نام"/>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">نام خانوادگی</label>
                                                                        <input type="text" id="last_name" name="last_name" className="form-control" placeholder="نام خانوادگی"/>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">تاریخ تولد</label>
                                                                        <input type="text" id="birthday" name="birthday" className="form-control" placeholder="تاریخ تولد"/>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <label className="control-label">جنسیت</label>
                                                                    <select className="form-control" data-placeholder="جنسیت" tabIndex="1" name="gender" id="gender">
                                                                        <option value="male">مرد</option>
                                                                        <option value="female">زن</option>
                                                                    </select>
                                                                </div>

                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">کد ملی</label>
                                                                        <input type="text" id="national_code" name="national_code" className="form-control" placeholder="کد ملی"/>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <h3 className="form-section">اطلاعات تماس</h3>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">ایمیل</label>
                                                                        <input type="text" id="email_personal" name="email_personal" className="form-control" placeholder="ایمیل" disabled/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">شماره همراه</label>
                                                                        <input type="text" id="cellphone" name="cellphone" className="form-control" placeholder="شماره همراه"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label>آدرس</label>
                                                                        <textarea name="address_personal" id="address_personal" className="form-control" rows="3"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>کد پستی</label>
                                                                        <input type="text" className="form-control" name="zip_code" id="zip_code" placeholder="کد پستی"/>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>تلفن ثابت</label>
                                                                        <input type="text" className="form-control" name="phone" id="phone" placeholder="تلفن ثابت"/>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>شهر</label>
                                                                        <select className="form-control" data-placeholder="انتخاب کشور" tabIndex="1" name="country_id" class="city">
                                                                            <option value="male">ایران</option>
                                                                            <option value="female">استرالیا</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>شهر</label>
                                                                        <select className="form-control" data-placeholder="انتخاب شهر" tabIndex="1" name="province_id" class="province_id">
                                                                            <option value="male">تهران</option>
                                                                            <option value="female">تبریز</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label>شهر</label>
                                                                        <select className="form-control" data-placeholder="انتخاب استان" tabIndex="1" name="city_id" id="city_id">
                                                                            <option value="male">تهران</option>
                                                                            <option value="female">تبریز</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-actions right margin-top-20">
                                                                <button type="button" className="btn default">انصراف</button>
                                                                <button type="submit" className="btn blue">
                                                                    <i className="fa fa-check"/> ذخیره پروفایل</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <form className="horizontal-form corporation-form user-form" method="post" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                                        <div className="form-body">
                                                            <h3 className="form-section">اطلاعات شخص حقوقی</h3>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-label">نام شرکت</label>
                                                                        <input type="text" id="title" className="form-control" placeholder="نام شرکت"/>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">کد اقتصادی</label>
                                                                        <input type="text" id="economic_code" className="form-control" placeholder="کد اقتصادی"/>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <label className="control-label">شماره پروانه</label>
                                                                    <input type="text" id="register_code" className="form-control" placeholder="شماره پروانه"/>
                                                                </div>

                                                            </div>

                                                            <h3 className="form-section">اطلاعات تماس</h3>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">ایمیل</label>
                                                                        <input type="text" id="email_corporation" className="form-control" placeholder="ایمیل"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group ">
                                                                        <label className="control-label">تلفن ثابت</label>
                                                                        <input type="text" id="cellphone_corporation" className="form-control" placeholder="تلفن ثابت"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <select className="form-control" data-placeholder="انتخاب کشور" tabIndex="1">
                                                                        <option value="male">تهران</option>
                                                                        <option value="female">تبریز</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <select className="form-control" data-placeholder="انتخاب شهر" tabIndex="1">
                                                                        <option value="male">تهران</option>
                                                                        <option value="female">تبریز</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <select className="form-control" data-placeholder="انتخاب استان" tabIndex="1">
                                                                        <option value="male">تهران</option>
                                                                        <option value="female">تبریز</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-actions margin-top-20">
                                                                <button type="button" className="btn default">انصراف</button>
                                                                <button type="submit" className="btn blue">
                                                                    <i className="fa fa-check"/> ذخیره پروفایل</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="tab-pane" id="tab_1_2">
                                                    <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                                        eiusmod. </p>
                                                    <form action="#" role="form">
                                                        <div className="form-group">
                                                            <div className="fileinput fileinput-new" data-provides="fileinput">
                                                                <div className="fileinput-new thumbnail" style={{width: '200px',height: '150px'}}>
                                                                    <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt="" /> </div>
                                                                <div className="fileinput-preview fileinput-exists thumbnail" style={{maxWidth: '200px', maxHeight: '150px'}}> </div>
                                                                <div>
                                                                            <span className="btn default btn-file">
                                                                                <span className="fileinput-new"> Select image </span>
                                                                                <span className="fileinput-exists"> Change </span>
                                                                                <input type="file" name="..."/> </span>
                                                                    <a href="javascript:;" className="btn default fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                                                </div>
                                                            </div>
                                                            <div className="clearfix margin-top-10">
                                                                <span className="label label-danger">NOTE! </span>
                                                                <span>Attached image thumbnail is supported in Latest Firefox, Chrome, Opera, Safari and Internet Explorer 10 only </span>
                                                            </div>
                                                        </div>
                                                        <div className="margin-top-10">
                                                            <a href="javascript:;" className="btn green"> Submit </a>
                                                            <a href="javascript:;" className="btn default"> Cancel </a>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="tab-pane" id="tab_1_3">
                                                    <form action="#">
                                                        <div className="form-group">
                                                            <label className="control-label">Current Password</label>
                                                            <input type="password" className="form-control" /> </div>
                                                        <div className="form-group">
                                                            <label className="control-label">New Password</label>
                                                            <input type="password" className="form-control" /> </div>
                                                        <div className="form-group">
                                                            <label className="control-label">Re-type New Password</label>
                                                            <input type="password" className="form-control" /> </div>
                                                        <div className="margin-top-10">
                                                            <a href="javascript:;" className="btn green"> Change Password </a>
                                                            <a href="javascript:;" className="btn default"> Cancel </a>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserProfilePTR.propTypes = {
    email: React.PropTypes.string,
    repeat_password: React.PropTypes.string,
    register: React.PropTypes.string,
    password: React.PropTypes.string,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'register'
})(UserProfilePTR);
