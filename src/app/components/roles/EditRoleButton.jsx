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

    grab( val, names ) {
        names = names.split( '.' );
        while ( val && names.length ) { val = val[ names.shift() ]; }
        return val;
    }

    size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    edit(event) {
        let self = this;
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
                if (self.size(self.grab(data, 'perm.global')) > 0) {
                    delete data.perm.parent;
                    delete data.perm.self;
                    // dispatch(roleDataAction(data));
                    console.log(data);
                } else if (self.size(self.grab(data, 'perm.parent')) > 0) {
                    delete data.perm.self;
                    console.log('fuck p')
                } else {
                    delete data.perm.global;
                    delete data.perm.parent;
                    console.log(data);
                }
                // console.log(self.size(self.grab(data, 'perm.self')));

            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        });
    }

    render() {
        return <button key="edit" ref={(EditElement) => this.editElementBtn=EditElement}
                  className="btn green edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                  onClick={(event) => this.edit(event)}><i className="fa fa-edit"/> ویرایش</button>;
    }
}