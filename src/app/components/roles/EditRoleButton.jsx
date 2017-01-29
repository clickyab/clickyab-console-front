import React, {Component} from "react";
import swagger from '../../swagger/index';
import {select} from "../../functions/select";
import {roleDataAction} from "../../redux/actions/index";
import {sync} from "../../functions/sync";
import {FailedBoxAlert} from "../../functions/notifications";
import {dispatch} from "../../functions/dispatch";
import {ifInvalidToken} from "../../functions/helpers";
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
            // const {error, data, response} = yield (new swagger.UserApi())
            //     .roleIdGet(id, select('user.token', 'no token'));
            // if (response.statusCode == '200') {
            //     $('#editRoleModal').modal();
            //     loadingProgress.stop();
            //     dispatch(roleDataAction(data));
            // } else if (response.statusCode == '400') {
            //     FailedBoxAlert(response)
            // }
            // ifInvalidToken(response);
        });
    }

    render() {
        return <button key="edit" ref={(EditElement) => this.editElementBtn=EditElement}
                  className="btn green edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                  onClick={(event) => this.edit(event)}><i className="fa fa-edit"/> ویرایش</button>;
    }
}