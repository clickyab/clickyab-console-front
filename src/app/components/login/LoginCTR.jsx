import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {successfulLogin, failedLogin} from '../../redux/actions/login';
import {AlertBox} from "../../functions/notifications";
import {updateLocalStorage} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
let Ladda = require('ladda/js/ladda');

@connect()
class LoginCTR extends Component {
    loadingProgress;

    loginSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(successfulLogin());
        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorage());
        dispatch(push('/publisher'));
        console.log('mildao narahat nakn')
    }

    failed400Dispatcher() {
        this.props.dispatch(failedLogin());
    }

    loginCallback(error, user, response) {
        if (response.statusCode == '200') {
            this.loginSuccessfullyDispatchers(user);

            AlertBox("success", response.text);
        } else if (response.statusCode == '400') {
            this.failed400Dispatcher();

            this.stopLoading();
            AlertBox("error", response.body.error);
        }
    }

    login(formValues) {
        (new swagger.UserApi())
            .userLoginPost({'payloadData': formValues}, this.loginCallback.bind(this));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.login-form button'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitCall = (values, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.login(values)
    };

    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}

export default LoginCTR;