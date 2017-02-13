import React, {Component} from "react";
import {connect} from "react-redux";
import EditUserModalPTR from "./EditUserModalPTR";
import swagger from "../../../swagger/index";
import {AlertBox} from "../../../functions/notifications";
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
                } else if (response.statusCode == '400') {
                    AlertBox('error', 'اطلاعات شما با موفقیت ثبت شد.');
                }

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
