import React, {Component} from 'react';
import SelectContentByChannelPTR from './SelectContentByChannelPTR';
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


export default class SelectContentByChannelCTR extends Component {

    CallSubmitGetPostsByChannel(formValues) {
            try {
                sync(function*() {

                    loadingProgress = Ladda.create(document.querySelector('button.submit-get-posts-channel'));
                loadingProgress.start();
                const {data, response} = yield (new swagger.ChannelApi())
                    .channelLastNameCountGet(formValues.name , formValues.count || 5, select("user.token", "no token"));
                response.error = 'اطلاعات شما صحیح نمی‌باشد.';
                response.text = 'اطلاعات شما با موفقیت ثبت شد.';
                if (response.statusCode == '200') {
                    // dispatch(createCampaign(data));
                    // dispatch(updateLocalStorageAction());

                    loadingProgress.stop();
                    SuccessBoxAlert(response);

                    // navigate('/v1/campaign/create/step/2');
                } else if (response.statusCode == '400') {
                    loadingProgress.stop();
                    FailedBoxAlert(response);
                }

                ifInvalidToken(response);
            });

        } catch (error) {
                console.log(error)
            }

    }

    SubmitGetPostsByChannel = (formValues, form) => {
        if(!form.valid())
            return;

        this.CallSubmitGetPostsByChannel(formValues)
    };



    render() {
        return (<SelectContentByChannelPTR SubmitGetPostsByChannel={this.SubmitGetPostsByChannel}  />);
    }

}