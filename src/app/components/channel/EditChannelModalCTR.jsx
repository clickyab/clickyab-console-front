import React, {Component} from 'react';
import EditChannelModalPTR from './EditChannelModalPTR';
import {connect} from "react-redux";
import swagger from '../../swagger/index';
import {channelDataAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {getToken} from "../../redux/helpers";
import {FailedBoxAlert} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
let Ladda = require('ladda/js/ladda');

@connect(({channelData}) => ({channelData}))
export default class EditChannelModalCTR extends Component {
    loadingProgress;

    editSubmit(formValues) {
        this.loadingProgress = Ladda.create(document.querySelector('button.edit-channel-form'));
        this.loadingProgress.start();
        (new swagger.ChannelApi())
            .channelIdPut(this.props.id, getToken(), {'payloadData': formValues})
            .then(response => function (response) {
                if (response.statusCode == '200') {
                    this.loadingProgress.stop();
                    $("button.add-channel-form").parents(".modal").find(".closebt").click();
                } else if (response.statusCode == '400') {
                    FailedBoxAlert(response)
                }
                ifInvalidToken(response);
            });
    }
        SubmitEditChannel = (formValues, form) => {
        if (!form.valid())
            return;
        this.editSubmit(formValues)
    };

    render() {
        return (<EditChannelModalPTR channelData={this.props.channelData} SubmitEditChannel={this.SubmitEditChannel}/>);
    }
}
