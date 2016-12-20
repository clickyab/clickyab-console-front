import React, {Component} from 'react';
import ProfileSidebarPTR from './ProfileSidebarPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorage} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class ProfileSidebarCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorage());
        // dispatch(push('/publisher'));
    }


    LogoutCallback(error, user, response) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(user);

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    LogoutCall() {
        (new swagger.UserApi())
            .userLogoutGet(getToken(), this.LogoutCallback.bind(this));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('button.logout-btn'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitLogout = () => {
        this.loading();
        this.LogoutCall()
    };

    render() {
        return (<ProfileSidebarPTR SubmitLogout={this.SubmitLogout}/>);
    }
}
