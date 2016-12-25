import React, {Component} from 'react';
import PersonalUserPTR from './PersonalUserPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {updatePersonalInformation} from "../../redux/actions/user";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class PersonalUserCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updatePersonalInformation(user));
        dispatch(updateLocalStorageAction());
    }


    PersonalUserCallback({error, data, response}) {
        if (response.statusCode == '200') {
            console.log("data",data);
            console.log("data",response);
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
            this.loadingProgress.stop();

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {

            this.stopLoading();
            FailedBoxAlert(response);
        }
        ifInvalidToken(response);
    }

    PersonalCall(formValues) {
        (new swagger.UserApi())
            .userProfilePost(getToken(),
                {'payloadData':
                {
                    "personal":
                        formValues
                }
                })
            .then(response => this.PersonalUserCallback(response));
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
        return (<PersonalUserPTR SubmitPersonalUser={this.SubmitPersonalUser}/>);
    }
}
