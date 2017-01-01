import React, {Component} from 'react';
import AddChannelModalPTR from './AddChannelModalPTR';
import swagger from '../../swagger/index';
import {FailedBoxAlert} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
import {select} from "../../functions/select";
import {sync} from "../../functions/sync";
import {dispatch} from "../../functions/dispatch";
import {addChannel, channelListAction} from "../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class AddChannelModalCTR extends Component {

    addChannelSubmit(formValues) {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
            loadingProgress.start();
            const {response} = yield (new swagger.ChannelApi())
                .channelCreatePost(select("user.token", "no token"), {'payloadData': formValues});

            if (response.statusCode == 200) {
                $('#addChannelModal').modal('hide');
                loadingProgress.stop();

                const {data} = yield(new swagger.ChannelApi()).channelListGet(select('user.token'), {def: true});
                dispatch(channelListAction(data));


            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        });
    }

    SubmitEditChannel = (formValues, form) => {
        if (!form.valid())
            return;

        this.addChannelSubmit(formValues)
    };

    render() {
        return (<AddChannelModalPTR SubmitAddChannel={this.SubmitEditChannel}/>);
    }
}
