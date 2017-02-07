import React, {Component} from "react";
import CorporationUserPTR from "./CorporationUserPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {ifInvalidToken} from "../../functions/helpers";
import {updateCorporationInformation, deletePersonalInformation} from "../../redux/actions/user";
import {select} from "../../functions/select";

let Ladda = require('ladda/js/ladda');

@connect()
export default class CorporationUserCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(updateCorporationInformation(user));
        if (select('user.personal') != null) {
            dispatch(deletePersonalInformation());
        }
        dispatch(updateLocalStorageAction());
    }


    CorporationUserCallback({error, data, response}) {
        response.error = 'اطلاعات شما صحیح نمی‌باشد.';
        response.text = 'اطلاعات شما با موفقیت ثبت شد.';
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
