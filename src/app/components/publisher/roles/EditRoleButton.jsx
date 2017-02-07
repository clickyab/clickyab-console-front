import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {sync} from "../../../functions/sync";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {dispatch} from "./../../../functions/dispatch";
import {roleDataAction} from "../../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class EditRoleButton extends Component {
    editElementBtn;

    edit(event) {
        loadingProgress = Ladda.create(this.editElementBtn);
        loadingProgress.start();
        event.preventDefault();
        const {id} = this.props;
        sync(function*() {
            const {data, response} = yield (new swagger.UserApi())
                .userRoleIdGet(id, select('user.token', 'no token'));
            if (response.statusCode == '200') {
                $('#editRoleModal').modal();
                loadingProgress.stop();
                dispatch(roleDataAction(data));
            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        }.bind(this));
    }

    render() {
        return <button key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
                       className="btn btn-info btn-xs blue edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                       onClick={(event) => this.edit(event)}> ویرایش</button>;
    }
}