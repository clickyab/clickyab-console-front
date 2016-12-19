import React, {Component} from 'react';
import CorporationUserPTR from './CorporationUserPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorage} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class CorporationUserCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorage());
        // dispatch(push('/publisher'));
    }


    CorporationUserCallback(error, user, response) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(user);

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    CorporationCall(formValues) {
        (new swagger.UserApi())
            .userProfilePost(getToken(),{'payloadData': formValues}, this.CorporationUserCallback.bind(this));
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
        return (<CorporationUserPTR SubmitPersonalUser={this.SubmitCorporationUser}/>);
    }
}
