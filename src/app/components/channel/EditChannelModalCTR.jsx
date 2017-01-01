import React, {Component} from 'react';
import EditChannelModalPTR from './EditChannelModalPTR';
import {connect} from "react-redux";
import swagger from '../../swagger/index';
import {channelDataAction} from "../../redux/actions/index";
import {dispatch} from "../../functions/dispatch";
import {getToken} from "../../redux/helpers";
import {FailedBoxAlert} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
import {sync} from "../../functions/sync";
import {select} from "../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({channelData}) => ({channelData}))
export default class EditChannelModalCTR extends Component {


    EditSubmitCallback({error, data, response}) {
        if (response.statusCode == 200) {
            $('#menuModal').modal('hide');
            loadingProgress.stop();
            // dispatch(updateAChannelFromListAction(data));

        } else if (response.statusCode == '400') {
            FailedBoxAlert(response)
        }
        ifInvalidToken(response);
    }

    editSubmit(formValues) {
        sync(function *() {
            // loadingProgress = Ladda.create(document.querySelector('.edit-channel-form'));
            // loadingProgress.start();
            // const {error, data, response} = yield (new swagger.ChannelApi())
            //     .channelIdPut(this.props.channelData.id, select('user.token', 'no token'), {'payloadData': formValues});
            //
            // if (response.statusCode == 200) {
            //     $('#menuModal').modal('hide');
            //     loadingProgress.stop();
            //     console.log(data);
                // dispatch(updateAChannelFromListAction(data));

            // } else if (response.statusCode == '400') {
            //     FailedBoxAlert(response)
            // }
            //
            // ifInvalidToken(response);
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
