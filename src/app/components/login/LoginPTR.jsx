import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';
let Ladda = require('ladda/js/ladda');
import {AlertBox} from '../../functions/notifications';

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
										<button type="submit" className="btn">{login_submit}</button>
									</form>
                                    <div className="row">
                                        <div className="col-sm-6 col-sm-offset-3 social-login">
                                            <div className="social-login-buttons">
                                                <a className="btn btn-link-1 btn-link-1-google-plus" href="#">
                                                    <i className="fa fa-google-plus"/> {login_with_google}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
								</div>
                                <div className="panel-footer">
                                    <a href="#">{forgot_password}</a><br/>
                                    {do_not_have_an_account_yet} <a href="#">{register_now}</a>
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