import React, {Component} from 'react';
import CorporationUserPTR from './CorporationUserPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
import {updateUserInformation} from "../../redux/actions/user";

let Ladda = require('ladda/js/ladda');

@connect()
export default class CorporationUserCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        // dispatch(push('/publisher'));
    }


    CorporationUserCallback({error, data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
            this.loadingProgress.stop();
            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response);
        }
        ifInvalidToken(response);
    }
    CorporationCall(formValues) {
        (new swagger.UserApi())
            .userProfilePost(getToken(),
                {'payloadData': {"corporation": formValues}})
            .then(response => this.CorporationUserCallback(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.corporation-form button[type=submit]'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitCorporationUser = (formValues, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.CorporationCall(formValues)
    };

    render() {
        return (<CorporationUserPTR SubmitCorporationUser={this.SubmitCorporationUser}/>);
    }
}
