import React, {Component} from 'react';
import AddChannelModalPTR from './AddChannelModalPTR';
import {connect} from "react-redux";
import swagger from '../../swagger/index';
import {channelDataAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {getToken} from "../../redux/helpers";
import {FailedBoxAlert} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
import {select} from "../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class AddChannelModalCTR extends Component {


    addSubmitCallback({error, data, response}) {
        if (response.statusCode == 200) {
            $('#addChannelModal').modal('hide');
            loadingProgress.stop();
        } else if (response.statusCode == '400') {
            FailedBoxAlert(response)
        }
        ifInvalidToken(response);
    }
    addChannelSubmit(formValues) {
        loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
        loadingProgress.start();
        (new swagger.ChannelApi())
            .channelCreatePost(select("user.token","no token"), {'payloadData': formValues})
            .then(response => this.addSubmitCallback(response));
    }
    SubmitEditChannel = (formValues, form) => {
        if (!form.valid())
            return;
        this.addChannelSubmit(formValues)
    };
    render() {
        return (<AddChannelModalPTR  SubmitAddChannel={this.SubmitEditChannel}/>);
    }
}
