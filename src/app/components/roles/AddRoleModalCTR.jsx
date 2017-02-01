import React, {Component} from 'react';
import AddRoleModalPTR from './AddRoleModalPTR';
import swagger from '../../swagger/index';
import {FailedBoxAlert} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
import {select} from "../../functions/select";
import {sync} from "../../functions/sync";
import {dispatch} from "../../functions/dispatch";
import {roleListAction} from "../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class AddRoleModalCTR extends Component {

    ScopeScan(formValues) {
        if (formValues.global) {
            formValues.role = 'global';
            delete formValues.parent;
            delete formValues.self;
        } else if (formValues.parent) {
            formValues.role = 'parent';
            delete formValues.self;
        } else if (formValues.self) {
            formValues.role = 'self';
        }
        return formValues;
    }

    normalizeFormValues(formValues, self, parent, global) {
        delete formValues.self;
        delete formValues.parent;
        delete formValues.global;

        var selfPermission = [];
        for (let i=0; i < self.length; i++) {
            selfPermission.push(self[i].label);
        }

        var parentPermission = [];
        for (let i=0; i < parent.length; i++) {
            parentPermission.push(parent[i].label);
        }

        var globalPermission = [];
        for (let i=0; i < global.length; i++) {
            globalPermission.push(global[i].label);
        }


        formValues.perm = {
            self: selfPermission,
            parent: parentPermission,
            global: globalPermission
        };

        return formValues;
    }

    addRoleSubmit(formValues, self, parent, global) {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.add-role-form'));
            loadingProgress.start();
            const {response} = yield (new swagger.UserApi())
                .userRoleCreatePost(select("user.token", "no token"),
                    {'payloadData': this.normalizeFormValues(formValues, self, parent, global)});

            response.error = 'اطلاعات شما صحیح نمی‌باشد.';
            response.text = 'اطلاعات شما با موفقیت ثبت شد.';
            if (response.statusCode == 200) {
                $('#addRoleModal').modal('hide');
                loadingProgress.stop();

                const {data} = yield(new swagger.UserApi())
                    .userRolesGet(select('user.token'), {def: true});
                dispatch(roleListAction(data));


            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        }.bind(this));
    }

    SubmitAddRole = (formValues, form, self, parent, global) => {
        if (!form.valid())
            return;

        this.addRoleSubmit(formValues, self, parent, global);
    };

    render() {
        return (<AddRoleModalPTR permissions={this.props.permissions} SubmitAddRole={this.SubmitAddRole}/>);
    }
}
