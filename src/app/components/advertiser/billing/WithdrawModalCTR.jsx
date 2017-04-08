import React, {Component} from "react";
import WithdrawModalPTR from "./WithdrawModalPTR";
import swagger from "../../../swagger/index";
import {NotifyBox} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {select} from "../../../functions/select";
import {sync} from "../../../functions/sync";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class WithdrawModalCTR extends Component {

    withDrawSubmit(formValues) {
        formValues.user_id = select('user.user_id');
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
            loadingProgress.start();
            const {response} = yield (new swagger.BillingApi())
                .billingWithdrawalPost(select("user.token", "no token"), {'payloadData': formValues});

            response.error = 'اطلاعات شما صحیح نمی‌باشد.';
            response.text = 'اطلاعات شما با موفقیت ثبت شد.';
            if (response.statusCode == 200) {
                $('#withDrawModal').modal('hide');
                NotifyBox('success', 'اطلاعات شما با موفقیت ثبت شد', 8000)
                loadingProgress.stop();

			} else if (response.statusCode == '400') {
				NotifyBox('error', 'اطلاعات شما صحیح نمی‌باشد', 8000)
			}
			ifInvalidToken(response);
		});
	}

	SubmitWithDraw = (formValues, form) => {
		if (!form.valid())
			return;

		this.withDrawSubmit(formValues)
	};

	render() {
		return (<WithdrawModalPTR SubmitWithDraw={this.SubmitWithDraw}/>);
	}
}
