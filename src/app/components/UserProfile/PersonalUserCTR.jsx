import React, {Component} from "react";
import PersonalUserPTR from "./PersonalUserPTR";
import swagger from "./../../swagger/index";
import {SuccessBoxAlert, FailedBoxAlert, NotifyBox} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {updatePersonalInformation, deleteCorporationInformation} from "../../redux/actions/user";
import moment from "moment";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
let Ladda = require('ladda/js/ladda');

export default class PersonalUserCTR extends Component {
    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        dispatch(updatePersonalInformation(user));
        if (select('user.corporation') != null) {
            dispatch(deleteCorporationInformation());
        }
        dispatch(updateLocalStorageAction());
    }

    PersonalUserCallback({data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
            this.loadingProgress.stop();
            SuccessBoxAlert({text: 'اطلاعات شما با موفقیت ثبت شد.'});
            NotifyBox('success', 'اطلاعات شما با موفقیت ثبت شد.', 8000);
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert({error: 'اطلاعات شما صحیح نمی‌باشد.'});
            NotifyBox('error', 'اطلاعات شما صحیح نمی‌باشد.', 8000);
        }
    }

    PersonalCall(formValues) {
        (new swagger.UserApi())
            .userProfilePost(getToken(),
                {'payloadData': {"personal": formValues}})
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

        moment(formValues.birthday, 'MM-DD-YYYY').format('MMMM D');
        if (!form.valid())
            return;

        this.loading();
        this.PersonalCall(formValues)
    };

    render() {
        return (<PersonalUserPTR SubmitPersonalUser={this.SubmitPersonalUser}/>);
    }
}
