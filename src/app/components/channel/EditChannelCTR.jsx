import React, {Component} from 'react';
import swagger from './../../swagger/index';
import EditChannelPTR from './EditChannelPTR';
import $ from 'jquery';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

export default class EditChannelCTR extends Component {
    loadingProgress;

    EditChannelCallBack({error, data, response}) {
        console.log(data, response);
        if (response.statusCode == '200') {
            this.stopLoading();
            SuccessBoxAlert(response);
            $('.close-edit-channel-binder-modal').children().click();
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    GetChannelInfoCallBack({error, data, response}) {
        if(response.statusCode == '200') {
            this.stopLoading()
            $.each(data, function(key, val) {
                $('#' + key).val(val);
            })
        } else if(response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response)
        }

    }

    GetChannelInfo() {
        this.loading();
        let id = '2';
        (new swagger.ChannelApi())
            .channelIdGet(id, getToken())
            .then(response => this.GetChannelInfoCallBack(response));
    }

    EditChannelCall(formValues) {
        formValues.user_id = 0;
        let id = 6;
        (new swagger.ChannelApi())
            .channelIdPut(id, getToken(), {'payloadData': formValues})
            .then(response => this.EditChannelCallBack(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('button.edit-channel-form'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitEditChannel = (formValues, form) => {
        if(!form.valid())
            return;

        this.loading();
        this.EditChannelCall(formValues);

    }
    render() {
        return(<EditChannelPTR GetChannelInfo={this.GetChannelInfo.bind(this)} SubmitEditChannel={this.SubmitEditChannel} />);
    }
}