import React, {Component} from 'react';
import swagger from './../../swagger/index';
import AddChannelPTR from './AddChannelPTR';
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

export default class AddChannelCTR extends Component {
    loadingProgress;

    AddChannelCallBack({error, data, response}, reset) {
        console.log(response);
        if(response.statusCode == '200') {
            this.stopLoading();
            reset();
            SuccessBoxAlert(response);
            console.log(response, data);
        } else if (response.statusCode == '400') {
            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    AddChannelCall(formValues, reset) {
        formValues.user_id = 0;
        (new swagger.ChannelApi())
            .channelCreatePost(getToken(), {'payloadData': formValues})
            .then(response => this.AddChannelCallBack(response, reset));
    }

    SubmitAddChannel = (formValues, form, reset) => {
        if(!form.valid())
            return;

        this.loading();
        this.AddChannelCall(formValues, reset);
    }

    render() {
        return (<AddChannelPTR SubmitAddChannel={this.SubmitAddChannel}/>)
    }
}