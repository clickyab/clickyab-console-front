import React, {Component} from "react";
import {sync} from "../../../functions/sync";
import {select} from "../../../functions/select";
import {dispatch} from "../../../functions/dispatch";
import {DepositItemAction} from "../../../redux/actions/index";
import swagger from "../../../swagger/index";
let Ladda = require('ladda/js/ladda');
import {NotifyBox} from "../../../functions/notifications";
let loadingProgress;

export default class EditBillingButton extends Component {
    depositElementButton;
    deposit(event) {
        const {id} = this.props;
        let loadingProgress;
        sync(function *() {
            loadingProgress = Ladda.create(this.depositElementButton);
            loadingProgress.start();

            const {error, data, response} = yield (new swagger.BillingApi())
                .billingBillingIdGet(id, select('user.token', 'no token'));

            if (response.statusCode == 200) {
                $('#DepositModal').modal();
                loadingProgress.stop();
                dispatch(DepositItemAction(data));
            } else if (response.statusCode == '400') {
                NotifyBox("error","مشکلی به وجود آمده است لطفا دوباره تلاش کنید");
            }
        }.bind(this));
    }

    render() {
        return <div className="btn-group ">
            <button className="btn btn-info btn-xs deposit-item mt-ladda-btn ladda-button" data-style="zoom-in"
                    key="edit"  onClick={(event) => this.deposit(Object.assign({}, event))}
                    ref={(DepositElement) => this.depositElementButton = DepositElement}>واریز
            </button>
        </div>
    }
}