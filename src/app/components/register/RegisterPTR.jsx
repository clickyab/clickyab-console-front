import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';

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
        $('body').backstretch([
            './img/backgrounds/tehran.png',
        ]);

        this.form = $('form');
        this.form.validate({
            rules: {
                password: {
                    required: true,
                    minlength: 5
                },
                repeat_password: {
                    required: true,
                    minlength: 5,
                    equalTo:"#password"
                },
                email: {
                    required: true,
                    email: true
                },

            },
            messages: {
                password: {
                    required: 'لطفا کلمه عبور را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۵ کاراکتر باشد'
                },
                email: 'لطفا یک ایمیل معتبر وارد نمایید',
                repeat_password: 'لطفا کلمه عبور خود را تکرار کنید'
            }
        });
    }

    render() {
        let {
            email, password, repeat_password, register , create_account , do_you_have_account , login_now , register_submit , login_with_google
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
                                        <h3>{create_account}</h3>
                                    </div>
                                    <div className="form-top-right">
                                        <i className="fa fa-plus"/>
                                    </div>
                                </div>
                                <div className="form-bottom">
                                    <form role="form" action="" method="post" className="register-form" onSubmit={handleSubmit((values) => SubmitCall(values, this.form))}>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="email">{email}</label>
                                            <Field component="input" type="text" name="email" placeholder={email} className="form-username form-control" id="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="password">{password}</label>
                                            <Field component="input" type="password" name="password" placeholder={password} className="form-password form-control" id="password"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="repeat_password">{repeat_password}</label>
                                            <Field component="input" type="password" name="repeat_password" placeholder={repeat_password} className="form-password form-control" id="repeat_password"/>
                                        </div>
                                        <button type="submit" className="btn">{register_submit}</button>
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
