import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {translate} from "../../functions/translate";
import {Link} from "react-router";

class LoginForm extends Component {
    form = {};
    state = {
        validation: true
    };

    componentDidMount() {
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
    }

    render() {
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
                                        <h3>{translate('Login To Your Account')}</h3>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-key"/>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="login-form"
                                          onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="form-username">{translate('Email')}</label>
                                            <Field component="input" type="text" name="email" placeholder={translate('Email')}
                                                   className="form-username form-control" id="email"
                                                   style={{direction: 'ltr', textAlign: 'left'}}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="form-password">{translate('Password')}</label>
                                            <Field component="input" type="password" name="password"
                                                   placeholder={translate('Password')} className="form-password form-control"
                                                   id="password" style={{direction: 'ltr', textAlign: 'left'}}/>
                                        </div>
                                        <button type="submit" className="btn mt-ladda-btn ladda-button btn-primary"
                                                data-style="zoom-in"><span className="ladda-label">{translate('Login Submit')}</span>
                                        </button>
                                    </form>
                                </div>
                                <div className="panel-footer">

                                    <Link to="/v1/password-recovery">{translate('Forgot Password')}</Link><br/>
                                    {translate('Do Not Have An Account Yet')} <Link to="/v1/register">{translate('Register Now')}</Link>
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
    handleSubmit: React.PropTypes.func,
    SubmitCall: React.PropTypes.func
};
export default reduxForm({
    form: 'login'
})(LoginForm);