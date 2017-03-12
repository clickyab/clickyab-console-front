import React, {Component} from "react";
import PasswordRecoveryPTR from "./PasswordRecoveryPTR";
import swagger from "./../../swagger/index";
import {SuccessBoxAlert, NotifyBox} from "../../functions/notifications";
let Ladda = require('ladda/js/ladda');
let toastr = require('toastr');

export default class PasswordRecoveryCTR extends Component {
    loadingProgress;

    componentDidMount() {
        $('.preloader-page').hide();
    }

    forgotCallback({error, data, response}) {
        if (response.statusCode == '200') {
            $(".recovery-password-form , .form-top-left").fadeOut(function () {
                $(".success-message-recovery").fadeIn();
                $(".form-top-right i").attr("class", "fa fa-check");

            });
        } else if (response.statusCode == '400') {
            this.stopLoading();
            NotifyBox('error', 'ایمیل شما یافت نشد. لطفا ایمیل معتبر وارد نمایید.', 8000);
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