import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router";
import {translatable} from "react-multilingual/dist";

@translatable(({
    email,
    password,
    repeat_password,
    register,
    create_account,
    register_submit,
    do_you_have_account,
    login_now,
    login_with_google
}) => ({
    email,
    password,
    repeat_password,
    register,
    create_account,
    register_submit,
    do_you_have_account,
    login_now,
    login_with_google

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
        if ($(window).width() <= 768) {
            $('#bgvid').children().attr('src', '');
        }
        this.form = $('form');
        this.form.validate({
            rules: {
                password: {
                    required: true,
                    minlength: 6
                },
                repeat_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },

            },
            messages: {
                password: {
                    required: 'لطفا کلمه عبور را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۶ کاراکتر باشد'
                },
                email: 'لطفا یک ایمیل معتبر وارد نمایید',
                repeat_password: {
                    required: 'لطفا تکرار کلمه عبور را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۶ کاراکتر باشد',
                    equalTo: 'کلمه عبور و تکرار آن باید یکسان باشد'
                },
            }
        });
    }

    render() {
        let {
            email, password, repeat_password, register, create_account, do_you_have_account, login_now, register_submit, login_with_google
        } = this.props;
        const {handleSubmit, SubmitCall} = this.props;

        return (

            <div className="top-content auth-pages">
                <img src="/bg.jpg" className="fullscreen-back"/>
                <div className="inner-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 text">
                                <h1>
                                    <a href="http://rubikad.com">
                                        <img src="/img/logo_fa_white.svg" width="300px"/>
                                    </a>
                                </h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 form-box">
                                <div className="form-top">
                                    <div className="form-top-left">
                                        <h3>{create_account}</h3>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-plus"/>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="register-form"
                                          onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="email">{email}</label>
                                            <Field component="input" type="text" name="email" placeholder={email}
                                                   className="form-username form-control" id="email"
                                                   style={{direction: 'ltr', textAlign: 'left'}}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="password">{password}</label>
                                            <Field component="input" type="password" name="password"
                                                   placeholder={password} className="form-password form-control"
                                                   id="password" style={{direction: 'ltr', textAlign: 'left'}}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only"
                                                   htmlFor="repeat_password">{repeat_password}</label>
                                            <Field component="input" type="password" name="repeat_password"
                                                   placeholder={repeat_password} className="form-password form-control"
                                                   id="repeat_password" style={{direction: 'ltr', textAlign: 'left'}}/>
                                        </div>
                                        <button type="submit" className="btn mt-ladda-btn ladda-button btn-primary"
                                                data-style="zoom-in"><span
                                            className="ladda-label">{register_submit}</span></button>
                                    </form>
                                    {/*<div className="row">*/}
                                        {/*<div className="col-sm-6 col-sm-offset-3 social-login">*/}
                                            {/*<div className="social-login-buttons">*/}
                                                {/*<a className="btn btn-link-1 btn-link-1-google-plus" href="#">*/}
                                                    {/*<i className="fa fa-google-plus"/> {login_with_google}*/}
                                                {/*</a>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="panel-footer">
                                    {do_you_have_account} <Link to="/v1/login">{login_now}</Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

RegisterForm.propTypes = {
    email: React.PropTypes.string,
    repeat_password: React.PropTypes.string,
    register: React.PropTypes.string,
    password: React.PropTypes.string,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'register'
})(RegisterForm);
