import React, {Component} from 'react';
import ChangePasswordPTR from './ChangePasswordPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class ChangePasswordCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        // dispatch(push('/publisher'));
    }


    ChangePasswordCallback({error, data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    ChangePasswordCall(formValues) {
        (new swagger.UserApi())
            .userChangePasswordPost(getToken(), {'payloadData': formValues})
            .then(response => this.ChangePasswordCallback(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.corporation-form button[type=submit]'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitChangePasswordUser = (formValues, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.ChangePasswordCall(formValues)
    };

    render() {
        return (<ChangePasswordPTR SubmitChangePasswordUser={this.SubmitChangePasswordUser}/>);
    }
}
