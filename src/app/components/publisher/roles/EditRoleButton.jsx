import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {sync} from "../../../functions/sync";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {dispatch} from './../../../functions/dispatch';
import {roleDataAction} from "../../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class EditRoleButton extends Component {
    editElementBtn;

    grab(val, names) {
        names = names.split('.');
        while (val && names.length) {
            val = val[names.shift()];
        }
        return val;
    }

    size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    edit(event) {
        let _this = this;
        loadingProgress = Ladda.create(this.editElementBtn);
        loadingProgress.start();
        event.preventDefault();
        const {id} = this.props;
        sync(function*() {
            const {error, data, response} = yield (new swagger.UserApi())
                .userRoleIdGet(id, select('user.token', 'no token'));
            if (response.statusCode == '200') {
                $('#editRoleModal').modal();
                loadingProgress.stop();
                dispatch(roleDataAction(data));
                if (_this.size(_this.grab(data, 'perm.global')) > 0) {
                    dispatch(roleDataAction(Object.assign({}, select('roleData'), {global: true})));
                    // console.log('global is true', data);
                }
                if (_this.size(_this.grab(data, 'perm.parent')) > 0) {
                    dispatch(roleDataAction(Object.assign({}, select('roleData'), {parent: true})));
                	// console.log('parent is true', data)
                }
                if (_this.size(_this.grab(data, 'perm.self')) > 0) {
                    dispatch(roleDataAction(Object.assign({}, select('roleData'), {self: true})));
                	// console.log('self is true', data);
                }

            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        });
    }

    render() {
        return <button key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
                       className="btn btn-info btn-xs green edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                       onClick={(event) => this.edit(event)}> ویرایش</button>;
    }
}