import React, {Component} from "react";
import PersonalUserPTR from "./PersonalUserPTR";
import swagger from "./../../swagger/index";
import {FailedBoxAlert, NotifyBox, SuccessBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {deleteCorporationInformation, updatePersonalInformation} from "../../redux/actions/user";
import moment from "moment";
import {select} from "../../functions/select";
import {dispatch} from "../../functions/dispatch";
let Ladda = require('ladda/js/ladda');

let loadingProgress;

function editProfileSuccessfullyDispatchers(user) {
    dispatch(updatePersonalInformation(user));
    if (select('user.corporation') !== null) {
        dispatch(deleteCorporationInformation());
    }
    dispatch(updateLocalStorageAction());
}

function PersonalUserCallback({data, response}) {
    if (response.statusCode === 200) {
        editProfileSuccessfullyDispatchers(Object.assign({}, data));
        loadingProgress.stop();
        SuccessBoxAlert({text: 'اطلاعات شما با موفقیت ثبت شد.'});
        NotifyBox('success', 'اطلاعات شما با موفقیت ثبت شد.', 8000);
    } else if (response.statusCode === 400) {
        stopLoading();
        FailedBoxAlert({error: 'اطلاعات شما صحیح نمی‌باشد.'});
        NotifyBox('error', 'اطلاعات شما صحیح نمی‌باشد.', 8000);
    }
}

function PersonalCall(formValues) {
    (new swagger.UserApi())
        .userProfilePost(getToken(),
            {'payloadData': {"personal": formValues}})
        .then(response => PersonalUserCallback(response));
}

function loading() {
    loadingProgress = Ladda.create(document.querySelector('.personal-form button[type=submit]'));
    loadingProgress.start();
}

function stopLoading() {
    if (loadingProgress)
        loadingProgress.stop();
}

function SubmitPersonalUser(formValues, form) {
    moment(formValues.birthday, 'MM-DD-YYYY').format('MMMM D');
    if (!form.valid())
        return;

    loading();
    PersonalCall(formValues)
}

export default function PersonalUserCTR() {
    return (<PersonalUserPTR SubmitPersonalUser={SubmitPersonalUser}/>);
}