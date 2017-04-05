import React, {Component} from "react";
import AddChannelModalPTR from "./AddChannelModalPTR";
import swagger from "../../../swagger/index";
import {FailedBoxAlert} from "../../../functions/notifications";
import {ifInvalidToken} from "../../../functions/helpers";
import {select} from "../../../functions/select";
import {sync} from "../../../functions/sync";
import {dispatch} from "../../../functions/dispatch";
import {channelListAction} from "../../../redux/actions/index";
let Ladda = require('ladda/js/ladda');
let loadingProgress;

export default class AddChannelModalCTR extends Component {

	addChannelSubmit(formValues) {
		formValues.user_id = select('user.user_id');
		sync(function*() {
			loadingProgress = Ladda.create(document.querySelector('button.add-channel-form'));
			loadingProgress.start();
			const {response} = yield (new swagger.ChannelApi())
				.channelPost(select("user.token", "no token"), {'payloadData': formValues});

			response.error = 'اطلاعات شما صحیح نمی‌باشد.';
			response.text = 'اطلاعات شما با موفقیت ثبت شد.';
			if (response.statusCode == 200) {
				$('#addChannelModal').modal('hide');
				loadingProgress.stop();

				const {data} = yield(new swagger.ChannelApi()).channelListGet(select('user.token'));
				dispatch(channelListAction(data));


			} else if (response.statusCode == '400') {
				FailedBoxAlert(response)
			}
			ifInvalidToken(response);
		});
	}

	SubmitEditChannel = (formValues, form) => {
		if (!form.valid())
			return;

		this.addChannelSubmit(formValues)
	};

	render() {
		return (<AddChannelModalPTR SubmitAddChannel={this.SubmitEditChannel}/>);
	}
}
