import React, {Component} from 'react';
import UserProfilePTR from './UserProfilePTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorage} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class UserProfileCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorage());
        // dispatch(push('/publisher'));
    }


    PersonalUserCallback(error, user, response) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(user);

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    PersonalCall(formValues) {
        (new swagger.UserApi())
            .userProfilePost(getToken(),{'payloadData': formValues}, this.PersonalUserCallback.bind(this));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.personal-form button[type=submit]'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitPersonalUser = (formValues, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.PersonalCall(formValues)
    };

    render() {
        return (<UserProfilePTR SubmitPersonalUser={this.SubmitPersonalUser}/>);
    }
}
