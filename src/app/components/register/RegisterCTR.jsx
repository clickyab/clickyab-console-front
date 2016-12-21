import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {successfulRegister, failedRegister} from '../../redux/actions/register';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import RegisterPTR from './RegisterPTR';
import swagger from './../../swagger/index';
let Ladda = require('ladda/js/ladda');

@connect()
export default class RegisterCTR extends Component {
    loadingProgress;

    registerSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(successfulRegister());
        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        dispatch(push('/publisher'));
    }

    failed400Dispatcher() {
        this.props.dispatch(failedRegister());
    }

    registerCallback(error, user, response) {
        if (response.statusCode == '200') {
            this.registerSuccessfullyDispatchers(user);

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {
            this.failed400Dispatcher();

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    register(formValues) {
        (new swagger.UserApi())
            .userRegisterPost({'payloadData': formValues}, this.registerCallback.bind(this));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.register-form button'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitCall = (formValues, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.register(formValues)
    };

    render() {
        return (<RegisterPTR SubmitCall={this.SubmitCall}/>);
    }
}