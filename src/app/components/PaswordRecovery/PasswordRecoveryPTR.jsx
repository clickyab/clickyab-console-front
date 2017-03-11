import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router";
import {RouteTransition} from "react-router-transition";
import {translatable} from "react-multilingual/dist";


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
class PasswordRecoveryPTR extends Component {
    form = {};
    state = {
        validation: true
    };

    componentDidMount() {

        this.form = $("form");
        this.form.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                email: "لطفا یک ایمیل معتبر وارد نمایید",
            }
        });
    }

    render() {

        let {
            email, forget_submit, do_you_have_account, login_now, please_enter_your_mail_to_send_new_password, forgotPassTitle
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
                                            <h3>{forgotPassTitle}</h3>
                                            <p>{please_enter_your_mail_to_send_new_password}</p>
                                        </div>
                                        <div className="form-top-right">
                                            <i className="fa fa-rocket"/>
                                        </div>
                                    </div>
                                    <div className="form-bottom">
                                        <form role="form" action="" method="post" className="recovery-password-form"
                                              onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="form-username">{email}</label>
                                                <Field component="input" type="text" name="email" placeholder={email}
                                                       className="form-username form-control" id="email"
                                                       style={{direction: 'ltr', textAlign: 'left'}}/>
                                            </div>
                                            <button type="submit" className="btn mt-ladda-btn ladda-button btn-primary"
                                                    data-style="zoom-in"><span
                                                className="ladda-label">{forget_submit}</span></button>
                                        </form>
                                        <div className="success-message-recovery text-center" style={{display: 'none'}}>
                                            <h3>ایمیل بازیابی کلمه عبور با موفقیت ارسال شد</h3>
                                            <p>لطفا بخش BULK یا SPAM ایمیل خود را نیز چک کنید</p>
                                        </div>
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

PasswordRecoveryPTR.propTypes = {
    email: React.PropTypes.string,
};

export default reduxForm({
    form: 'PasswordRecoveryPTR'
})(PasswordRecoveryPTR);