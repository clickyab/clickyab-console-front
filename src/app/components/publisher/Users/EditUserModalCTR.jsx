import React, {Component} from "react";
import {connect} from "react-redux";
import EditUserModalPTR from "./EditUserModalPTR";
import swagger from "../../../swagger/index";
import {updateAChannelFromListAction} from "../../../redux/actions/index";
import {dispatch} from "../../../functions/dispatch";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

@connect(({userData}) => ({userData}))
export default class EditUserModalCTR extends Component {

    editSubmit(formValues) {
        const {id} = this.props.channelData;
        sync(function *() {
            loadingProgress = Ladda.create(document.querySelector('.edit-channel-form'));
            loadingProgress.start();
            const {data, response} = yield (new swagger.ChannelApi())
                .channelIdPut(id, select('user.token', 'no token'), {'payloadData': formValues});

            if (response.statusCode == 200) {
                $('#editUserModal').modal('hide');
                loadingProgress.stop();
                dispatch(updateAChannelFromListAction(data));
            } else if (response.statusCode == '400') {
                FailedBoxAlert({
                    error: 'اطلاعات شما صحیح نمی‌باشد.',
                    text: 'اطلاعات شما با موفقیت ثبت شد.'
                })
            }

            ifInvalidToken(response);
        });
    }


    SubmitEditUser = (formValues, form) => {
        if (!form.valid())
            return;
        this.editSubmit(formValues)
    };

    render() {
        const {form, userData} = this.props;
        return (<EditUserModalPTR form={form} userData={userData} SubmitEditUser={this.SubmitEditUser}/>);
    }
}
