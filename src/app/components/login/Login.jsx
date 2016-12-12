import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router'
import {translatable} from 'react-multilingual/dist';
import {FooterFullScreen} from '../layouts/FooterFullScreen';
import {checkStatus , parseJSON} from '../../functions/helpers';
let Ladda = require('ladda/js/ladda');
import {AlertBox} from '../../functions/notifications';

@translatable(({
	first_name,
	last_name,
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
	first_name,
	last_name,
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
	form;
	state = {
		validation: true
	};

	componentDidMount() {
		AlertBox("error","سلام");

		$("body").css("background","#a0b4c9");
		$("body").css("height","100vh");

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

	};
	// 	if (this.form.valid()) {
	// 		fetch('test1.json')
	// 			.then(checkStatus)
	// 			.then(parseJSON)
	// 			.then(function(data) {
    //
	// 				console.log('parsed json', data)
    //
	// 			})
	// 	}
	// 	else
	// 		console.log('you have error');
	// };

	render() {


		let {first_name , last_name , login, email, password, login_with_google, forgot_password, or_login_with , to_reset_your_password , login_to_your_account ,  do_not_have_an_account_yet ,  click , here ,   create_account, submit} = this.props;
		const {handleSubmit} = this.props;
		return (

			<div className="login">
				<div className="logo">
					<a href="index.html">
						<img src="/img/logo_fa.png" alt="" width="150px" /> </a>
				</div>
				<div className="content">
					<form className="login-form" action="index.html" method="post">
						<h3 className="form-title">{login_to_your_account}</h3>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">{first_name}</label>
								<input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder={first_name} name="first_name" />
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">{last_name}</label>
								<input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder={last_name} name="last_name" />
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">{email}</label>
							<div className="input-icon">
								<i className="fa fa-envelope-o"/>
								<input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder={email} name="email" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">{password}</label>
							<div className="input-icon">
								<i className="fa fa-lock"/>
								<input className="form-control placeholder-no-fix" type="password" autoComplete="off" placeholder={password} name="password" /> </div>
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
								<a href="javascript:;" id="forget-password"> {here} </a> {click} {to_reset_your_password}. </p>
						</div>
						<div className="create-account">
							<p> {do_not_have_an_account_yet}&nbsp;
								<a href="javascript:;" id="register-btn"> {create_account} </a>
							</p>
						</div>
					</form>
					<form className="forget-form" action="index.html" method="post">
						<h3>Forget Password ?</h3>
						<p> Enter your e-mail address below to reset your password. </p>
						<div className="form-group">
							<div className="input-icon">
								<i className="fa fa-envelope"/>
								<input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder="Email" name="email" /> </div>
						</div>
						<div className="form-actions">
							<button type="button" id="back-btn" className="btn grey-salsa btn-outline"> Back </button>
							<button type="submit" className="btn green pull-right"> Submit </button>
						</div>
					</form>
					<form className="register-form" action="index.html" method="post">
						<h3>Sign Up</h3>
						<p> Enter your personal details below: </p>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Full Name</label>
							<div className="input-icon">
								<i className="fa fa-font"/>
								<input className="form-control placeholder-no-fix" type="text" placeholder="Full Name" name="fullname" /> </div>
						</div>
						<div className="form-group">

							<label className="control-label visible-ie8 visible-ie9">Email</label>
							<div className="input-icon">
								<i className="fa fa-envelope"/>
								<input className="form-control placeholder-no-fix" type="text" placeholder="Email" name="email" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Address</label>
							<div className="input-icon">
								<i className="fa fa-check"/>
								<input className="form-control placeholder-no-fix" type="text" placeholder="Address" name="address" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">City/Town</label>
							<div className="input-icon">
								<i className="fa fa-location-arrow"/>
								<input className="form-control placeholder-no-fix" type="text" placeholder="City/Town" name="city" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Country</label>
							<select name="country" id="country_list" className="select2 form-control">
								<option value=""/>
								<option value="AF">Afghanistan</option>
								<option value="AL">Albania</option>
								<option value="DZ">Algeria</option>
								<option value="AS">American Samoa</option>
								<option value="AD">Andorra</option>
								<option value="AO">Angola</option>
								<option value="AI">Anguilla</option>
								<option value="AR">Argentina</option>
								<option value="AM">Armenia</option>
								<option value="AW">Aruba</option>
								<option value="AU">Australia</option>
								<option value="AT">Austria</option>
								<option value="AZ">Azerbaijan</option>
								<option value="BS">Bahamas</option>
								<option value="BH">Bahrain</option>
								<option value="BD">Bangladesh</option>
								<option value="BB">Barbados</option>
								<option value="BY">Belarus</option>
								<option value="BE">Belgium</option>
								<option value="BZ">Belize</option>
								<option value="BJ">Benin</option>
								<option value="BM">Bermuda</option>
								<option value="BT">Bhutan</option>
								<option value="BO">Bolivia</option>
								<option value="BA">Bosnia and Herzegowina</option>
								<option value="BW">Botswana</option>
								<option value="BV">Bouvet Island</option>
								<option value="BR">Brazil</option>
								<option value="IO">British Indian Ocean Territory</option>
								<option value="BN">Brunei Darussalam</option>
								<option value="BG">Bulgaria</option>
								<option value="BF">Burkina Faso</option>
								<option value="BI">Burundi</option>
								<option value="KH">Cambodia</option>
								<option value="CM">Cameroon</option>
								<option value="CA">Canada</option>
								<option value="CV">Cape Verde</option>
								<option value="KY">Cayman Islands</option>
								<option value="CF">Central African Republic</option>
								<option value="TD">Chad</option>
								<option value="CL">Chile</option>
								<option value="CN">China</option>
								<option value="CX">Christmas Island</option>
								<option value="CC">Cocos (Keeling) Islands</option>
								<option value="CO">Colombia</option>
								<option value="KM">Comoros</option>
								<option value="CG">Congo</option>
								<option value="CD">Congo, the Democratic Republic of the</option>
								<option value="CK">Cook Islands</option>
								<option value="CR">Costa Rica</option>
								<option value="CI">Cote d'Ivoire</option>
								<option value="HR">Croatia (Hrvatska)</option>
								<option value="CU">Cuba</option>
								<option value="CY">Cyprus</option>
								<option value="CZ">Czech Republic</option>
								<option value="DK">Denmark</option>
								<option value="DJ">Djibouti</option>
								<option value="DM">Dominica</option>
								<option value="DO">Dominican Republic</option>
								<option value="EC">Ecuador</option>
								<option value="EG">Egypt</option>
								<option value="SV">El Salvador</option>
								<option value="GQ">Equatorial Guinea</option>
								<option value="ER">Eritrea</option>
								<option value="EE">Estonia</option>
								<option value="ET">Ethiopia</option>
								<option value="FK">Falkland Islands (Malvinas)</option>
								<option value="FO">Faroe Islands</option>
								<option value="FJ">Fiji</option>
								<option value="FI">Finland</option>
								<option value="FR">France</option>
								<option value="GF">French Guiana</option>
								<option value="PF">French Polynesia</option>
								<option value="TF">French Southern Territories</option>
								<option value="GA">Gabon</option>
								<option value="GM">Gambia</option>
								<option value="GE">Georgia</option>
								<option value="DE">Germany</option>
								<option value="GH">Ghana</option>
								<option value="GI">Gibraltar</option>
								<option value="GR">Greece</option>
								<option value="GL">Greenland</option>
								<option value="GD">Grenada</option>
								<option value="GP">Guadeloupe</option>
								<option value="GU">Guam</option>
								<option value="GT">Guatemala</option>
								<option value="GN">Guinea</option>
								<option value="GW">Guinea-Bissau</option>
								<option value="GY">Guyana</option>
								<option value="HT">Haiti</option>
								<option value="HM">Heard and Mc Donald Islands</option>
								<option value="VA">Holy See (Vatican City State)</option>
								<option value="HN">Honduras</option>
								<option value="HK">Hong Kong</option>
								<option value="HU">Hungary</option>
								<option value="IS">Iceland</option>
								<option value="IN">India</option>
								<option value="ID">Indonesia</option>
								<option value="IR">Iran (Islamic Republic of)</option>
								<option value="IQ">Iraq</option>
								<option value="IE">Ireland</option>
								<option value="IL">Israel</option>
								<option value="IT">Italy</option>
								<option value="JM">Jamaica</option>
								<option value="JP">Japan</option>
								<option value="JO">Jordan</option>
								<option value="KZ">Kazakhstan</option>
								<option value="KE">Kenya</option>
								<option value="KI">Kiribati</option>
								<option value="KP">Korea, Democratic People's Republic of</option>
								<option value="KR">Korea, Republic of</option>
								<option value="KW">Kuwait</option>
								<option value="KG">Kyrgyzstan</option>
								<option value="LA">Lao People's Democratic Republic</option>
								<option value="LV">Latvia</option>
								<option value="LB">Lebanon</option>
								<option value="LS">Lesotho</option>
								<option value="LR">Liberia</option>
								<option value="LY">Libyan Arab Jamahiriya</option>
								<option value="LI">Liechtenstein</option>
								<option value="LT">Lithuania</option>
								<option value="LU">Luxembourg</option>
								<option value="MO">Macau</option>
								<option value="MK">Macedonia, The Former Yugoslav Republic of</option>
								<option value="MG">Madagascar</option>
								<option value="MW">Malawi</option>
								<option value="MY">Malaysia</option>
								<option value="MV">Maldives</option>
								<option value="ML">Mali</option>
								<option value="MT">Malta</option>
								<option value="MH">Marshall Islands</option>
								<option value="MQ">Martinique</option>
								<option value="MR">Mauritania</option>
								<option value="MU">Mauritius</option>
								<option value="YT">Mayotte</option>
								<option value="MX">Mexico</option>
								<option value="FM">Micronesia, Federated States of</option>
								<option value="MD">Moldova, Republic of</option>
								<option value="MC">Monaco</option>
								<option value="MN">Mongolia</option>
								<option value="MS">Montserrat</option>
								<option value="MA">Morocco</option>
								<option value="MZ">Mozambique</option>
								<option value="MM">Myanmar</option>
								<option value="NA">Namibia</option>
								<option value="NR">Nauru</option>
								<option value="NP">Nepal</option>
								<option value="NL">Netherlands</option>
								<option value="AN">Netherlands Antilles</option>
								<option value="NC">New Caledonia</option>
								<option value="NZ">New Zealand</option>
								<option value="NI">Nicaragua</option>
								<option value="NE">Niger</option>
								<option value="NG">Nigeria</option>
								<option value="NU">Niue</option>
								<option value="NF">Norfolk Island</option>
								<option value="MP">Northern Mariana Islands</option>
								<option value="NO">Norway</option>
								<option value="OM">Oman</option>
								<option value="PK">Pakistan</option>
								<option value="PW">Palau</option>
								<option value="PA">Panama</option>
								<option value="PG">Papua New Guinea</option>
								<option value="PY">Paraguay</option>
								<option value="PE">Peru</option>
								<option value="PH">Philippines</option>
								<option value="PN">Pitcairn</option>
								<option value="PL">Poland</option>
								<option value="PT">Portugal</option>
								<option value="PR">Puerto Rico</option>
								<option value="QA">Qatar</option>
								<option value="RE">Reunion</option>
								<option value="RO">Romania</option>
								<option value="RU">Russian Federation</option>
								<option value="RW">Rwanda</option>
								<option value="KN">Saint Kitts and Nevis</option>
								<option value="LC">Saint LUCIA</option>
								<option value="VC">Saint Vincent and the Grenadines</option>
								<option value="WS">Samoa</option>
								<option value="SM">San Marino</option>
								<option value="ST">Sao Tome and Principe</option>
								<option value="SA">Saudi Arabia</option>
								<option value="SN">Senegal</option>
								<option value="SC">Seychelles</option>
								<option value="SL">Sierra Leone</option>
								<option value="SG">Singapore</option>
								<option value="SK">Slovakia (Slovak Republic)</option>
								<option value="SI">Slovenia</option>
								<option value="SB">Solomon Islands</option>
								<option value="SO">Somalia</option>
								<option value="ZA">South Africa</option>
								<option value="GS">South Georgia and the South Sandwich Islands</option>
								<option value="ES">Spain</option>
								<option value="LK">Sri Lanka</option>
								<option value="SH">St. Helena</option>
								<option value="PM">St. Pierre and Miquelon</option>
								<option value="SD">Sudan</option>
								<option value="SR">Suriname</option>
								<option value="SJ">Svalbard and Jan Mayen Islands</option>
								<option value="SZ">Swaziland</option>
								<option value="SE">Sweden</option>
								<option value="CH">Switzerland</option>
								<option value="SY">Syrian Arab Republic</option>
								<option value="TW">Taiwan, Province of China</option>
								<option value="TJ">Tajikistan</option>
								<option value="TZ">Tanzania, United Republic of</option>
								<option value="TH">Thailand</option>
								<option value="TG">Togo</option>
								<option value="TK">Tokelau</option>
								<option value="TO">Tonga</option>
								<option value="TT">Trinidad and Tobago</option>
								<option value="TN">Tunisia</option>
								<option value="TR">Turkey</option>
								<option value="TM">Turkmenistan</option>
								<option value="TC">Turks and Caicos Islands</option>
								<option value="TV">Tuvalu</option>
								<option value="UG">Uganda</option>
								<option value="UA">Ukraine</option>
								<option value="AE">United Arab Emirates</option>
								<option value="GB">United Kingdom</option>
								<option value="US">United States</option>
								<option value="UM">United States Minor Outlying Islands</option>
								<option value="UY">Uruguay</option>
								<option value="UZ">Uzbekistan</option>
								<option value="VU">Vanuatu</option>
								<option value="VE">Venezuela</option>
								<option value="VN">Viet Nam</option>
								<option value="VG">Virgin Islands (British)</option>
								<option value="VI">Virgin Islands (U.S.)</option>
								<option value="WF">Wallis and Futuna Islands</option>
								<option value="EH">Western Sahara</option>
								<option value="YE">Yemen</option>
								<option value="ZM">Zambia</option>
								<option value="ZW">Zimbabwe</option>
							</select>
						</div>
						<p> Enter your account details below: </p>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Username</label>
							<div className="input-icon">
								<i className="fa fa-user"/>
								<input className="form-control placeholder-no-fix" type="text" autoComplete="off" placeholder="Username" name="username" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Password</label>
							<div className="input-icon">
								<i className="fa fa-lock"/>
								<input className="form-control placeholder-no-fix" type="password" autoComplete="off" id="register_password" placeholder="Password" name="password" /> </div>
						</div>
						<div className="form-group">
							<label className="control-label visible-ie8 visible-ie9">Re-type Your Password</label>
							<div className="controls">
								<div className="input-icon">
									<i className="fa fa-check"/>
									<input className="form-control placeholder-no-fix" type="password" autoComplete="off" placeholder="Re-type Your Password" name="rpassword" /> </div>
							</div>
						</div>
						<div className="form-group">
							<label className="mt-checkbox mt-checkbox-outline">
								<input type="checkbox" name="tnc" /> I agree to the
								<a href="javascript:;">Terms of Service </a> &
								<a href="javascript:;">Privacy Policy </a>
								<span/>
							</label>
							<div id="register_tnc_error"> </div>
						</div>
						<div className="form-actions">
							<button id="register-back-btn" type="button" className="btn grey-salsa btn-outline"> Back </button>
							<button type="submit" id="register-submit-btn" className="btn green pull-right"> Sign Up </button>
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
	handleSubmit: React.PropTypes.func
};

export default reduxForm({
	form: 'login'
})(LoginForm);