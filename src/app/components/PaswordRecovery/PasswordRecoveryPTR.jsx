import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';
let Ladda = require('ladda/js/ladda');
import {AlertBox} from '../../functions/notifications';

@translatable(({
    do_you_have_account,
    login_now,
    email,
    please_enter_your_mail_to_send_new_password,
    forget_submit,
    forgotPassTitle

}) => ({
    do_you_have_account,
    login_now,
    email,
    please_enter_your_mail_to_send_new_password,
    forget_submit,
    forgotPassTitle
}))
class LoginForm extends Component {
    form = {};
    state = {
        validation: true
    };

    componentDidMount() {
        AlertBox("error", "سلام");

        $('body').backstretch([
            './img/backgrounds/tehran.png',
        ]);

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
            email,forget_submit, do_you_have_account , login_now, please_enter_your_mail_to_send_new_password  , forgotPassTitle
        } = this.props;
        const {handleSubmit, SubmitCall} = this.props;
        return (

            <div className="top-content auth-pages">

                <div className="inner-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2 text">
                                <h1>
                                    <a href="http://clickyab.com">
                                        <img src="img/logo_fa.png" width="150px"/>
                                    </a>
                                </h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3 form-box">
                                <div className="form-top">
                                    <div className="form-top-left">
                                        <h3>{forgotPassTitle}</h3>
                                        <p>{please_enter_your_mail_to_send_new_password}</p>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-rocket"/>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="login-form" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="form-username">{email}</label>
                                            <Field component="input" type="text" name="email" placeholder={email} className="form-username form-control" id="email"/>
                                        </div>

                                        <button type="submit" className="btn">{forget_submit}</button>
                                    </form>
                                </div>
                                <div className="panel-footer">
                                    {do_you_have_account} <a href="#">{login_now}</a>
                                </div>

                            </div>
                        </div>

                    </div>
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