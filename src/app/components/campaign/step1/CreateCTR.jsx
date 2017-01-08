import React, {Component} from 'react';
import CreatePTR from './CreatePTR';
import {connect} from 'react-redux';
import {SuccessBoxAlert, FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
let Ladda = require('ladda/js/ladda');
import {select} from '../../../functions/select'

export default class CreateCTR extends Component {
    loadingProgress;
    componentDidMount() {
    }

    SubmitCampaignCallback({error, data, response}) {
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

    SubmitCampaignSwagger(formValues) {

        (new swagger.UserApi())
            .userProfilePost(getToken(),
                {'payloadData': {"personal": formValues}})
            .then(response => this.SubmitCampaignCallback(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.personal-form button[type=submit]'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitCampaign = (formValues, form) => {

        if (!form.valid())
            return;

        this.loading();
        this.SubmitCampaignSwagger(formValues)
    };


    render() {
            return (<CreatePTR submitCampaignName={this.SubmitCampaign} />);
    }
}