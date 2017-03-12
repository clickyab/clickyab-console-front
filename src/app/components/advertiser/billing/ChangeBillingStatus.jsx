import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";


export default class ChangeBillingStatus extends Component {

    edit(event) {
        const {id} = this.props;
        sync(function*() {
            const {response} = yield (new swagger.BillingApi())
                .billingListStatusIdPut(id, getToken(), {
                    payloadData: {
                        "admin_status": event.target.value
                    }
                });
        });
    }

    render() {
        let {translator, status} = this.props;
        return <select key={Math.random()} className="form-control input-sm" name="status" defaultValue={status}
                       onChange={this.edit.bind(this)}>
            <option data-tokens="accepted" value="accepted">{translator('accepted')}</option>
            <option data-tokens="pending" value="pending">{translator('pending')}</option>
            <option data-tokens="rejected" value="rejected">{translator('rejected')}</option>
        </select>
    }
}