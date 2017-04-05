import React, {Component} from "react";
import ProfileSidebarPTR from "./ProfileSidebarPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {FailedBoxAlert} from "../../functions/notifications";
import {asyncRemoveLocalStorageAction, flush} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {logout} from "../../redux/actions/login";
import {navigate} from "../../functions/navigate";
let Ladda = require('ladda/js/ladda');

@connect(({user}) => ({user}))
export default class ProfileSidebarCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(logout(user));
        dispatch(asyncRemoveLocalStorageAction());
        navigate('/v1/login');
        dispatch(flush());
    }


    LogoutCallback({error, data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    LogoutCall() {
        (new swagger.UserApi())
            .userLogoutGet(getToken())
            .then(response => this.LogoutCallback(response));
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
        const {UserName} = this.props;
        return (<ProfileSidebarPTR UserName={UserName} SubmitLogout={this.SubmitLogout}/>);
    }
}
