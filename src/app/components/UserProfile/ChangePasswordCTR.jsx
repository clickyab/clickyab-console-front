import React, {Component} from 'react';
import ChangePasswordPTR from './ChangePasswordPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class ChangePasswordCTR extends Component {
    loadingProgress;

    ChangePasswordCallback({error, data, response}, reset) {
        if (response.statusCode == '200') {
            this.loadingProgress.stop();
			reset();
            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    ChangePasswordCall(formValues, reset) {
        (new swagger.UserApi())
            .userChangePasswordPost(getToken(), {'payloadData': formValues})
            .then(response => this.ChangePasswordCallback(response, reset));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('button.change-password-form'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitChangePasswordUser = (formValues, form, reset) => {
        if (!form.valid())
            return;

        this.loading();
        this.ChangePasswordCall(formValues, reset)
    };

    render() {
        return (<ChangePasswordPTR SubmitChangePasswordUser={this.SubmitChangePasswordUser}/>);
    }
}