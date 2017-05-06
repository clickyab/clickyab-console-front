import React, {PropTypes} from "react";
import ChangePasswordPTR from "./ChangePasswordPTR";
import swagger from "./../../swagger/index";
import {FailedBoxAlert, SuccessBoxAlert} from "../../functions/notifications";
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
let Ladda = require('ladda/js/ladda');

let loadingProgress;

function ChangePasswordCallback({response}, reset) {
    if (response.statusCode === 200) {
        loadingProgress.stop();
        reset();
        SuccessBoxAlert({
            error: 'اطلاعات شما صحیح نمی‌باشد.',
            text: 'اطلاعات شما با موفقیت ثبت شد.'
        });
    } else if (response.statusCode === 400) {
        stopLoading();
        FailedBoxAlert({
            error: 'اطلاعات شما صحیح نمی‌باشد.',
            text: 'اطلاعات شما با موفقیت ثبت شد.'
        });
    }
    ifInvalidToken(response);
}

function ChangePasswordCall(formValues, reset) {
    (new swagger.UserApi())
        .userChangePasswordPost(getToken(), {'payloadData': formValues})
        .then(response => ChangePasswordCallback(response, reset));
}

function loading() {
    loadingProgress = Ladda.create(document.querySelector('button.change-password-form'));
    loadingProgress.start();
}

function stopLoading() {
    if (loadingProgress)
        loadingProgress.stop();
}

function  SubmitChangePasswordUser(formValues, form, reset) {
    if (!form.valid())
        return;

    loading();
    ChangePasswordCall(formValues, reset)
}

export default function ChangePasswordCTR() {
    return (<ChangePasswordPTR SubmitChangePasswordUser={SubmitChangePasswordUser}/>);
}