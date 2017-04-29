import React, {Component, PropTypes} from "react";
let $ = require("jquery");
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router";
import {translate} from "../../functions/translate";

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
										<h3>{translate('Forgot Password Title')}</h3>
										<p>{translate('Please Enter Your Mail To Send New Password')}</p>
									</div>
									<div className="form-top-right">
										<i className="fa fa-rocket"/>
									</div>
								</div>
								<div className="form-bottom">
									<form role="form" action="" method="post" className="recovery-password-form"
										  onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
										<div className="form-group">
											<label className="sr-only" htmlFor="form-username">{translate("email")}</label>
											<Field component="input" type="text" name="email" placeholder={translate("email")}
												   className="form-username form-control" id="email"
												   style={{direction: 'ltr', textAlign: 'left'}}/>
										</div>
										<button type="submit" className="btn mt-ladda-btn ladda-button btn-primary"
												data-style="zoom-in"><span
											className="ladda-label">{translate("Forget Submit")}</span></button>
									</form>
									<div className="success-message-recovery text-center" style={{display: 'none'}}>
										<h3>ایمیل بازیابی کلمه عبور با موفقیت ارسال شد</h3>
										<p>لطفا بخش BULK یا SPAM ایمیل خود را نیز چک کنید</p>
									</div>
								</div>
								<div className="panel-footer">
									{translate("Do You Have Account")} <Link to="/v1/login">{translate("Login Now")}</Link>
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
    handleSubmit: PropTypes.func,
	SubmitCall: PropTypes.func
};

export default reduxForm({
	form: 'PasswordRecoveryPTR'
})(PasswordRecoveryPTR);