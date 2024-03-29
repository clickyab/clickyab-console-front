import React, {PropTypes} from "react";
import swagger from "../../../swagger/index";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import {mapPropsToHandler} from "../../../functions/mapPropsToHandler";

function edit(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;
    sync(function*() {
        yield (new swagger.BillingApi())
            .billingListStatusIdPut(id, getToken(), {
                payloadData: {"admin_status": event.target.value}
            });
    });
}

export default function ChangeBillingStatus({translator, status, id}) {
    return (
        <select key={Math.random()} className="form-control input-sm" name="status" defaultValue={status}
                onChange={edit} data-id={id}>
            <option data-tokens="accepted" value="accepted">{translator('accepted')}</option>
            <option data-tokens="pending" value="pending">{translator('pending')}</option>
            <option data-tokens="rejected" value="rejected">{translator('rejected')}</option>
        </select>
    )
}