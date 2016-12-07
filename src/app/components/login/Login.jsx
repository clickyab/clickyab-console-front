import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'
import {translatable} from 'react-multilingual/dist';
import {FooterFullScreen} from '../layouts/FooterFullScreen';
import {checkStatus , parseJSON} from '../../helpers';
let Ladda = require('ladda/js/ladda');
let Lobibox = require('./../../../../public/vendor/lobibox');


@translatable(({
	login,
	email,
	password,
	forgotPass,
	createAccount,
	submit
}) => ({
	login,
	email,
	password,
	forgotPass,
	createAccount,
	submit
}))
class LoginForm extends Component {
	form;
	state = {
		validation: true
	};

	componentDidMount() {
		Lobibox.notify(
			'error',
			{
				size: 'mini',
				rounded: false,
				sound: false,
				icon: false,
				delay: 10000000,
				position: "top right",
				delayIndicator: true,
				msg: "گه خوردی ثبت نام میکنی تو کلیک یاب"
			}
		);

		$("body").css("background","white");


		$('.login-bg').backstretch([
				"/img/pages/img/login/bg1.jpg",
				"/img/pages/img/login/bg2.jpg",
				"/img/pages/img/login/bg3.jpg"
			], {
				fade: 1000,
				duration: 8000
			}
		);
		$("html,body").css("height","100%");

		this.form = $("form");
		this.form.validate({
			rules: {
				thefield: { digits:true, required: true },
				password: {
					required: true,
					minlength: 5
				},
				email: {
					required: true,
					email: true
				},
			},
			tooltip_options: {
				thefield: { placement: 'left' }
			},
			messages: {
				password: {
					required: "لطفا کلمه عبور را وارد نمایید",
					minlength: "کلمه عبور حداقل باید ۵ کاراکتر باشد"
				},
				email: "لطفا یک ایمیل معتبر وارد نمایید",
			}
		});



		Ladda.bind( '.mt-ladda-btn.mt-progress-demo ', {
			callback: function( instance ) {
				var progress = 0;
				var interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );
					instance.setProgress( progress );

					if( progress === 1 ) {
						instance.stop();
						clearInterval( interval );
					}
				}, 400 );
			}
		} );

	}



	submit = (values) => {
		if (this.form.valid()) {
			fetch('test1.json')
				.then(checkStatus)
				.then(parseJSON)
				.then(function(data) {

					console.log('parsed json', data)

				})
		}
		else
			console.log('you have error');
	};

	render() {


		let {login, email, password, forgotPass, createAccount, submit} = this.props;
		const {handleSubmit} = this.props;
		return (

			<div className="user-login-5">

				<div className="row">

					<div className="col-md-6 bs-reset mt-login-5-bsfix">
						<div className="login-bg">
							<div className="login-logo">
								<div className="logo" />
							</div>
						</div>
					</div>

					<div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
						<div className="login-content">
							<h1>{ login }</h1>
							<p>
								لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود.
							</p>

							<form className="login-form" noValidate onSubmit={handleSubmit(this.submit)}>
								<div className="row">
									<div className="col-xs-6">
										<div className="form-group form-md-line-input">
											<Field className="form-control form-control-solid" required name="email"
												   component="input"
												   placeholder={email}
												   type="email"/>
										</div>
									</div>
									<div className="col-xs-6">
										<div className="form-group form-md-line-input">
											<Field className="form-control form-control-solid" required name="password"
												   component="input"
												   placeholder={password}
												   type="password"/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-8 col-sm-offset-4 text-right">
										<div className="forgot-password">
											<Link to='password-recovery' id="forget-password" className="forget-password">{ forgotPass }</Link>
										</div>
										<button className="btn blue mt-ladda-btn ladda-button mt-progress-demo" data-loading-text="Loading..." data-style="slide-left" type="submit">
											<span className="ladda-label">{submit}</span>
										</button>
									</div>
								</div>
							</form>
						</div>
						<div className="login-footer">
							<div className="row bs-reset">
								<div className="col-xs-12 bs-reset text-center">
									<FooterFullScreen />
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
	handleSubmit: React.PropTypes.func
};

export default reduxForm({
	form: 'login'
})(LoginForm);