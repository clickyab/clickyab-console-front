import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'
import GoogleLogin from './../common/google-login/index';
import {translatable} from 'react-multilingual/dist';

const responseGoogle = (response) => {
    console.log(response);
}

@translatable(({
    login,
    login_submit,
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
    register_now,
    submit
}) => ({
    login,
    login_submit,
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
    register_now,
    submit
}))
class LoginForm extends Component {
    form = {};
    state = {
        validation: true
    };

    componentDidMount() {
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
    }
    render() {

        let {
            login, email, password, login_with_google, forgot_password, or_login_with, to_reset_your_password,
            login_to_your_account, do_not_have_an_account_yet, click, here, register_now,login_submit,
            create_account, submit
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
										<h3>{login_to_your_account}</h3>
									</div>
									<div className="form-top-right">
										<i className="fa fa-key"/>
									</div>
								</div>
								<div className="form-bottom">
									<form role="form" action="" method="post" className="login-form" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
										<div className="form-group">
											<label className="sr-only" htmlFor="form-username">{email}</label>
											<Field component="input" type="text" name="email" placeholder={email} className="form-username form-control" id="email"/>
										</div>
										<div className="form-group">
											<label className="sr-only" htmlFor="form-password">{password}</label>
											<Field component="input" type="password" name="password" placeholder={password} className="form-password form-control" id="password"/>
										</div>
										<button type="submit" className="btn mt-ladda-btn ladda-button" data-style="zoom-in"><span className="ladda-label">{login_submit}</span></button>
									</form>
                                    <div className="row">
                                        <div className="col-sm-6 col-sm-offset-3 social-login">
                                            <div className="social-login-buttons">

                                                <GoogleLogin
                                                    clientId={'67839817377-ev6oc5tcb56qr3ku3nub8b2neu2c5csg.apps.googleusercontent.com'}
                                                    onSuccess={responseGoogle}
                                                    onFailure={responseGoogle}
                                                    offline={false}
                                                    className="btn btn-link-1 btn-link-1-google-plus"
                                                >
                                                        <i className="fa fa-google-plus"/> {login_with_google}
                                                </GoogleLogin>
                                            </div>
                                        </div>
                                    </div>
								</div>
                                <div className="panel-footer">
                                    <Link to="/password-recovery">{forgot_password}</Link><br/>
                                    {do_not_have_an_account_yet} <Link to="/register">{register_now}</Link>
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