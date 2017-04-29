import React, {Component, PropTypes} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {channelDataAction} from "../../../redux/actions/index";
import {sync} from "../../../functions/sync";
import {FailedBoxAlert} from "../../../functions/notifications";
import {dispatch} from "../../../functions/dispatch";
import {ifInvalidToken} from "../../../functions/helpers";
let $ = require('jquery');

export default class EditChannelButton extends Component {
    editElementBtn;

    edit(event) {
        $(event.target).addClass("disabled");
        const {id} = this.props;
        sync(function*() {
            const {data, response} = yield (new swagger.ChannelApi())
                .channelIdGet(id, select('user.token', 'no token'));
            if (response.statusCode == '200') {
                $('#editChannelModal').modal();
                $(event.target).removeClass("disabled");
                dispatch(channelDataAction(data));
            } else if (response.statusCode == '400') {
                $(event.target).removeClass("disabled");
                FailedBoxAlert(response)
            }
            ifInvalidToken(response);
        });
    }

    render() {
        return (
            <div className="btn-group ">
                <button className="btn btn-info btn-xs edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                        key="edit" onClick={(event) => this.edit(Object.assign({}, event))}
                        ref={(EditElement) => this.editElementBtn = EditElement}>ویرایش
                </button>
            </div>
        )
    }
}

EditChannelButton.propTypes = {
    id: PropTypes.number
};