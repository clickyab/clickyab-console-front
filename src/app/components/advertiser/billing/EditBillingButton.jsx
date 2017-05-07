import React, {Component} from "react";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
import {dispatch} from "../../../functions/dispatch";
import {DepositItemAction} from "../../../redux/actions/index";
import swagger from "../../../swagger/index";
import {NotifyBox} from "../../../functions/notifications";
let Ladda = require('ladda/js/ladda');

function deposit(event) {
    event.preserve();
    const id = event.target.attributes.getNamedItem('data-id').value;
    let loadingProgress;
    sync(function *() {
        loadingProgress = Ladda.create(event.target);
        loadingProgress.start();

        const {error, data, response} = yield (new swagger.BillingApi())
            .billingBillingIdGet(id, select('user.token', 'no token'));

        if (response.statusCode === 200) {
            $('#DepositModal').modal();
            loadingProgress.stop();
            dispatch(DepositItemAction(data));
        } else if (response.statusCode === 400) {
            NotifyBox("error", "مشکلی به وجود آمده است لطفا دوباره تلاش کنید");
        }
    });
}

export default function EditBillingButton() {
    return (<div className="btn-group ">
        <button className="btn btn-info btn-xs deposit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                key="edit" onClick={deposit}>واریز
        </button>
    </div>);
}