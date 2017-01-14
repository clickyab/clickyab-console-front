import React, {Component} from 'react';
import PasswordRecoveryPTR from './PasswordRecoveryPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
let Ladda = require('ladda/js/ladda');

export default class PasswordRecoveryCTR extends Component {
    loadingProgress;

    forgotCallback({error, data, response}) {
        response.error = 'اطلاعات شما صحیح نمی‌باشد.';
        response.text = 'اطلاعات شما با موفقیت ثبت شد.';
        if (response.statusCode == '200') {
            SuccessBoxAlert(response);
            $(".recovery-password-form , .form-top-left").fadeOut(function () {
                $(".success-message-recovery").fadeIn();
                $(".form-top-right i").attr("class", "fa fa-check");

            });
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response)
        }
    }

    forgot(formValues) {
        (new swagger.UserApi())
            .userForgotCallPost({'payloadData': formValues})
            .then(response => this.forgotCallback(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.recovery-password-form button'));
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
        this.forgot(formValues)
    };

    render() {
        return (<PasswordRecoveryPTR SubmitCall={this.SubmitCall}/>);
    }
}