import React, {Component} from 'react';
import CreatePTR from './CreatePTR';
import swagger from '../../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert, FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {sync} from "./../../../functions/sync";
import {createCampaign} from "../../../redux/actions/index";
import {dispatch} from "./../../../functions/dispatch";
import {navigate} from "../../../functions/navigate";
import {updateLocalStorageAction} from "../../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
import {select} from '../../../functions/select'
let loadingProgress;

export default class CreateCTR extends Component {

    createCampaignNameSubmit(formValues) {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.btn-campaign-name'));
            loadingProgress.start();

            const {data, response} = yield (new swagger.AdApi())
                .adPost(select("user.token", "no token"), {'payloadData': formValues});

            response.error = 'اطلاعات شما صحیح نمی‌باشد.';
            response.text = 'اطلاعات شما با موفقیت ثبت شد.';
            if (response.statusCode == '200') {
                dispatch(createCampaign(data));
                dispatch(updateLocalStorageAction());

                loadingProgress.stop();
                SuccessBoxAlert(response);

                navigate('/v1/campaign/create/step/2');
            } else if (response.statusCode == '400') {
                loadingProgress.stop();
                FailedBoxAlert(response);
            }

            ifInvalidToken(response);
        });
    }

    SubmitCreateCampaignName = (formValues, form) => {
        if(!form.valid())
            return;

        this.createCampaignNameSubmit(formValues)
    };


    render() {
        return (<CreatePTR SubmitCreateCampaignName={this.SubmitCreateCampaignName} />);
    }

}