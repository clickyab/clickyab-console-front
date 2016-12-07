import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'
import {translatable} from 'react-multilingual/dist';
import {FooterFullScreen} from '../layouts/FooterFullScreen.jsx';

@translatable( ({forgotPassTitle, email, submit}) => ({forgotPassTitle, email, submit}) )

class ForgotPassword extends Component {

    state = {
        validation: true
    };
    componentDidMount() {
        $('body').css('background','white');
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
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                email: 'لطفا یک ایمیل معتبر وارد نمایید',
            }
        });
    }

    form;
    
    render() {
        let {forgotPassTitle, email, submit} = this.props;
        const { handleSubmit} = this.props;
        return(
            <div className='user-login-5'>
                <div className='row'>
                    <div className='col-md-6 bs-reset mt-login-5-bsfix'>
                            <div className='login-bg'>
                                <div className='login-logo'>
                                    <div className='logo' />
                                </div>
                            </div>
                    </div>

                    <div className='col-md-6 login-container bs-reset mt-login-5-bsfix'>
                        <div className='login-content'>
                            <h3 className='font-green'> {forgotPassTitle }</h3>
                            <p>
                                با ورود به سیستم مشکل دارید؟  ایمیل بازیابی مرتبط با حسابتان را وارد کنید
                            </p>
                            <form className='login-form' onSubmit={handleSubmit(this.props)}>
                                <div className='row'>
                                    <div className='form-group form-md-line-input'>
                                        <Field className='form-control form-control-solid' name='email' component='input' type='email'
                                        placeholder={email} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8 col-sm-offset-4 text-right">
                                        <div className="forgot-password">
                                            <Link to='password-recovery' id="forget-password" className="forget-password">حساب کاربری ندارید؟ ثبت نام کنید</Link>
                                        </div>
                                        <button className="btn blue mt-ladda-btn ladda-button mt-progress-demo" data-loading-text="Loading..." data-style="slide-left" type="submit">
                                            <span className="ladda-label">{submit}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='login-footer'>
                            <div className='row bs-reset'>
                                <div className='col-xs-12 bs-reset text-center'>
                                    <FooterFullScreen />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPassword.propTypes = {
    forgotPassTitle: React.PropTypes.string,
    email: React.PropTypes.string,
    submit: React.PropTypes.string,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'ForgotPassword',
})(ForgotPassword);