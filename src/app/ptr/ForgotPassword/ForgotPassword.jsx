import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {translatable} from 'react-multilingual/dist';
import {FooterFullScreen} from './../../../layouts/FooterFullScreen.jsx';

@translatable( ({forgotPassTitle, email, submit}) => ({forgotPassTitle, email, submit}) )

class ForgotPassword extends Component {
    form;
    state = {
        validation: true
    };
    componentDidMount() {
        $("body").css("background","white");
        $('.login-bg').backstretch([
                "./img/pages/img/login/bg1.jpg",
                "./img/pages/img/login/bg2.jpg",
                "./img/pages/img/login/bg3.jpg"
            ], {
                fade: 1000,
                duration: 8000
            }
        );

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
        let {forgotPassTitle, email, submit} = this.props;
        const { handleSubmit} = this.props;
        return(
            <div className="user-login-5">
                <div className="row">
                    <div className="col-md-6 bs-reset mt-login-5-bsfix">
                        <div className="form-group form-md-line-input">
                            <div className="login-bg">
                                <div className="login-logo">
                                    <div className="logo" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                        <div className="login-content">
                            <h3 className="font-green"> {forgotPassTitle }</h3>
                            <form className="login-form" onSubmit={handleSubmit(this.props)}>
                                <div className="row">
                                    <div className="form-group form-md-line-input">
                                        <Field className="form-control form-control-solid" name="email" component="input" type="email"
                                        placeholder={email} />
                                    </div>
                                </div>
                                <div className="row">
                                    <button type="submit" className="btn btn-success uppercase pull-right">{ submit }</button>
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
        )
    }
}

ForgotPassword.propTypes = {
    forgotPassTitle: React.PropTypes.string,
    email: React.PropTypes.string,
    submit: React.PropTypes.string,
    handleSubmit: React.PropTypes.func
};

export default reduxForm({
    form: 'ForgotPassword',
})(ForgotPassword);