import React, {Component} from 'react';
import $ from 'jquery';
import {reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';
let Ladda = require('ladda/js/ladda');
import {AlertBox} from '../../functions/notifications';

@translatable(({
    login,
    email,
    login_with_google,
    password,
    forgot_password,
    or_login_with,
    to_reset_your_password,
    click,
    here,
    create_account,
    do_not_have_an_account_yet,
    login_to_your_account,
    submit
}) => ({
    login,
    email,
    login_with_google,
    password,
    forgot_password,
    or_login_with,
    to_reset_your_password,
    click,
    here,
    create_account,
    do_not_have_an_account_yet,
    login_to_your_account,
    submit
}))
class LoginForm extends Component {
    form = {};
    state = {
        validation: true
    };

    componentDidMount() {
        AlertBox("error", "سلام");

        $("body").css("background", "#a0b4c9");
        $("body").css("height", "100vh");

        this.form = $("form");
        this.form.validate({
            rules: {
                password: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                password: {
                    required: "لطفا کلمه عبور را وارد نمایید",
                    minlength: "کلمه عبور حداقل باید ۵ کاراکتر باشد"
                },
                email: "لطفا یک ایمیل معتبر وارد نمایید",
            }
        });
        Ladda.bind('.mt-ladda-btn.mt-progress-demo ', {
            callback: function (instance) {
                var progress = 0;
                var interval = setInterval(function () {
                    progress = Math.min(progress + Math.random() * 0.1, 1);
                    instance.setProgress(progress);

                    if (progress === 1) {
                        instance.stop();
                        clearInterval(interval);
                    }
                }, 400);
            }
        });

    }

    render() {

        let {
            login, email, password, login_with_google, forgot_password, or_login_with, to_reset_your_password,
            login_to_your_account, do_not_have_an_account_yet, click, here,
            create_account, submit
        } = this.props;
        const {handleSubmit, SubmitCall} = this.props;
        return (

            <div className="login">
                <div className="logo">
                    <a href="index.html">
                        <img src="/img/logo_fa.png" alt="" width="150px"/> </a>
                </div>
                <div className="content">
                    <form className="login-form" action="index.html" method="post"
                          onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                        <h3 className="form-title">{login_to_your_account}</h3>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">{email}</label>
                            <div className="input-icon">
                                <i className="fa fa-envelope-o"/>
                                <input className="form-control placeholder-no-fix" type="text" autoComplete="off"
                                       placeholder={email} name="email"/></div>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">{password}</label>
                            <div className="input-icon">
                                <i className="fa fa-lock"/>
                                <input className="form-control placeholder-no-fix" type="password" autoComplete="off"
                                       placeholder={password} name="password"/></div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn green pull-left"> {login} </button>
                        </div>
                        <div className="login-options">
                            <h4>{or_login_with}</h4>

                            <a href="javascript:;" className="btn red btn-block">
                                <i className="fa fa-google"/>
                                {login_with_google}
                            </a>
                        </div>
                        <div className="forget-password">
                            <h4>{forgot_password}</h4>
                            <p>
                                <a href="javascript:;"
                                   id="forget-password"> {here} </a> {click} {to_reset_your_password}. </p>
                        </div>
                        <div className="create-account">
                            <p> {do_not_have_an_account_yet}&nbsp;
                                <a href="javascript:;" id="register-btn"> {create_account} </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    login: React.PropTypes.string,
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    createAccount: React.PropTypes.string,
    forgotPass: React.PropTypes.string,
    submit: React.PropTypes.string,
    handleSubmit: React.PropTypes.func,
    login: React.PropTypes.func
};

export default reduxForm({
    form: 'login'
})(LoginForm);