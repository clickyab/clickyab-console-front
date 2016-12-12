import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';
import Radio from './../common/form/Radio';

@translatable(({
    email,
    password,
    rpassword,
    register,
    copyright,
    advertiser,
    publisher,
    agency,
    nameAndLast,
    mobileNo,
    sex,
    male,
    female,
    legalName,
    phone
}) => ({
    email,
    password,
    rpassword,
    register,
    copyright,
    advertiser,
    publisher,
    agency,
    nameAndLast,
    mobileNo,
    sex,
    male,
    female,
    legalName,
    phone
}))
class RegisterForm extends Component {
    form;
    state = {
        validation: true
    };
    submit = (values) => {
        console.log(values);
    };

    componentDidMount() {
        $('body').css('background', 'white');
        $('.login-bg').backstretch([
                './img/pages/img/login/bg1.jpg',
                './img/pages/img/login/bg2.jpg',
                './img/pages/img/login/bg3.jpg'
            ], {
                fade: 1000,
                duration: 8000
            }
        );

        this.form = $('form');
        this.form.validate({
            rules: {
                password: {
                    required: true,
                    minlength: 5
                },
                rpassword: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                userType: {
                    required: true
                },
                name: {
                    required: true,
                },
                radio2: {
                    required: true,
                },
                mobile: {
                    required: true,
                    digits: true
                },

            },
            tooltip_options: {
                thefield: {placement: 'left'}
            },
            messages: {
                password: {
                    required: 'لطفا کلمه عبور را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۵ کاراکتر باشد'
                },
                email: 'لطفا یک ایمیل معتبر وارد نمایید',
                userType: 'انتخاب جنسیت الزامی می‌باشد',
                name: 'لطفا نام و نام‌خانوادگی را وارد نمایید',
                mobile: 'لطفا شماره همراه خود را به صورت صحیح وارد نمایید',
                rpassword: 'لطفا کلمه عبور خود را تکرار کنید'
            }
        });
    }

    render() {
        let {
            email, password, rpassword, register, advertiser, publisher, agency,
            nameAndLast, mobileNo, sex, male, female, legalName, phone
        } = this.props;
        const {handleSubmit} = this.props;

        return (
            <form className='login-form' onSubmit={handleSubmit(this.submit)}>
                <h1>{register}</h1>
                <h5 className='font-green'>

                    در صورتی که قبلا ثبت نام کرده‌اید <a href='/login' style={{color: 'red'}}>اینجا</a> کلیک نمایید.
                </h5>

                <div className='row'>
                    <div className="form-group form-md-checkboxes"
                         style={{
                             "paddingRight": "12px",
                             "position": "relative", "top": "15px"
                         }}>
                        <label>نوع کاربری خود را مشخص کنید: </label>
                        <div className="md-radio-inline">
                            <Radio value="person" name="user-type" id="user-type-person" label="حقیقی"/>
                            <Radio value="company" name="user-type" id="user-type-company" label="حقوقی"/>
                        </div>
                    </div>
                </div>

                <div className="restOfTheForm" style={{filter: "blur(5px)"}}>
                    <div className='row'>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='name'
                                       component='input' type='text' placeholder={nameAndLast}/>

                            </div>
                        </div>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='name'
                                       component='input' type='text' placeholder={nameAndLast}/>

                            </div>
                        </div>
                        <div className='col-md-12 col-sm-12 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <select className='form-control' name='delivery' aria-required='true'
                                        aria-describedby='delivery-error' aria-invalid='false'>
                                    <option value=''>{sex}</option>
                                    <option value='2'>{male}</option>
                                    <option value='3'>{female}</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='mobile' component='input'
                                       type='text' placeholder={mobileNo}/>
                            </div>
                        </div>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='email' component='input'
                                       type='text' placeholder={email}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='legalName' component='input'
                                       type='text' placeholder={legalName}/>
                            </div>
                        </div>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='phone' component='input'
                                       type='text' placeholder={phone}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='password' component='input'
                                       type='password' placeholder={password}/>
                            </div>
                        </div>
                        <div className='col-sm-6 col-xs-12'>
                            <div className='form-group form-md-line-input'>
                                <Field className='form-control form-control-solid' name='rpassword' component='input'
                                       type='password' placeholder={rpassword}/>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-sm-12 col-xs-12'>
                            <button type='submit'
                                    className='btn btn-success uppercase pull-right'>{register}
                            </button>
                        </div>
                    </div>
                </div>


            </form>
        );
    }
}

RegisterForm.propTypes = {
    email: React.PropTypes.string,
    rpassword: React.PropTypes.string,
    register: React.PropTypes.string,
    advertiser: React.PropTypes.string,
    publisher: React.PropTypes.string,
    agency: React.PropTypes.string,
    password: React.PropTypes.string,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'register'
})(RegisterForm);
