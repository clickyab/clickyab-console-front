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

@connect(({userAssignRoleList, userAssignRoleData}) => ({userAssignRoleList, userAssignRoleData}))
export default class EditUserModalCTR extends Component {


    SubmitEditUser(formValues, roleValue) {
        let roleValueId = [];
        for (let i = 0; i < roleValue.length; i++) {
            roleValueId.push(roleValue[i].id)
        }
        try {
            sync(function *() {
                loadingProgress = Ladda.create(document.querySelector('.edit-user-role'));
                loadingProgress.start();
                const {data, response} = yield (new swagger.UserApi())
                    .userAssignRolesPost(select('user.token', 'no token'), {
                        'payloadData': {
                            'role_id': roleValueId,
                            'user_id': select('userAssignRoleData.userId')
                        }
                    });

                if (response.statusCode == 200) {
                    $('#editUserModal').modal('hide');
                    loadingProgress.stop();
                    // dispatch(updateAChannelFromListAction(data));
                } else if (response.statusCode == '400') {
                    FailedBoxAlert({
                        error: 'اطلاعات شما صحیح نمی‌باشد.',
                        text: 'اطلاعات شما با موفقیت ثبت شد.'
                    })
                }

                ifInvalidToken(response);
            });
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        const {form, userAssignRoleList, userAssignRoleData} = this.props;
        return (<EditUserModalPTR userAssignRoleData={userAssignRoleData} userAssignRoleList={userAssignRoleList}
                                  form={form} SubmitEditUser={this.SubmitEditUser}/>);
    }
}
