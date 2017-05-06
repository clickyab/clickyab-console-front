import React, {Component, PropTypes} from "react";
import CorporationUserPTR from "./CorporationUserPTR";
import swagger from "./../../swagger/index";
import {FailedBoxAlert, NotifyBox, SuccessBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {getToken} from "../../redux/helpers";
import {dispatch} from "../../functions/dispatch";
import {deletePersonalInformation, updateCorporationInformation} from "../../redux/actions/user";
import {select} from "../../functions/select";
let Ladda = require('ladda/js/ladda');

let loadingProgress;

function editProfileSuccessfullyDispatchers(user) {
    dispatch(updateCorporationInformation(user));
    if (select('user.personal') !== null) {
        dispatch(deletePersonalInformation());
    }
    dispatch(updateLocalStorageAction());
}

function CorporationUserCallback({data, response}) {
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

function CorporationCall(formValues) {
    (new swagger.UserApi())
        .userProfilePost(getToken(),
            {'payloadData': {"corporation": formValues}})
        .then(response => CorporationUserCallback(response));
}

function loading() {
    loadingProgress = Ladda.create(document.querySelector('.corporation-form button[type=submit]'));
    loadingProgress.start();
}

function stopLoading() {
    if (loadingProgress)
        loadingProgress.stop();
}

function SubmitCorporationUser (formValues, form)  {
    if (!form.valid())
        return;

    loading();
    CorporationCall(formValues)
}

export default function CorporationUserCTR() {
    return (<CorporationUserPTR SubmitCorporationUser={SubmitCorporationUser}/>);
}

CorporationUserCTR.propTypes = {
	dispatch: PropTypes.func
};