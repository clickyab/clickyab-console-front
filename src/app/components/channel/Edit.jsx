import React, {Component} from "react";
import swagger from '../../swagger/index';
import {select} from "../../functions/select";
import {channelDataAction} from "../../redux/actions/index";
import {sync} from "../../functions/sync";
import {FailedBoxAlert} from "../../functions/notifications";
import {getToken} from "../../redux/helpers";
import {dispatch} from "../../functions/dispatch";

export default class Edit extends Component {
    edit(event) {
        event.preventDefault();
        $('#menuModal').modal();
        const {id} = this.props;
        sync(function*() {
            const {error, data, response} = yield (new swagger.ChannelApi())
                .channelIdGet(id, select('user.token', 'no token'));

            if (response.statusCode == '200') {
                dispatch(channelDataAction(data));
            } else if (response.statusCode == '400') {
                FailedBoxAlert(response)
            }

        });
    }

    editSubmit() {
        (new swagger.ChannelApi())
            .channelIdPut(this.props.id, getToken(), {'payloadData': formValues})
            .then(response => function (response) {
                console.log(response);
            });
    }


    render() {
        return <a key="edit"
                  className="btn btn-sm btn-outline grey-salsabtn btn-sm btn-outline grey-salsa edit-item"
                  onClick={(event) => this.edit(event)}><i className="fa fa-edit"/> ویرایش</a>;
    }
}