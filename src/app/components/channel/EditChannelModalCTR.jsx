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
let loadingProgress;

@connect(({channelData}) => ({channelData}))
export default class EditChannelModalCTR extends Component {


    EditSubmitCallback({error, data, response}) {
            if (response.statusCode == 200) {
                $('#menuModal').modal('hide');
                loadingProgress.stop();
            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
    }

    editSubmit(formValues) {
        loadingProgress = Ladda.create(document.querySelector('.edit-channel-form'));
        loadingProgress.start();
        (new swagger.ChannelApi())
            .channelIdPut(this.props.channelData.id, getToken(), {'payloadData': formValues})
            .then(response => this.EditSubmitCallback(response));
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
