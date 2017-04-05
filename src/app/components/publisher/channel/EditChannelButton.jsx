import React, {Component} from "react";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {channelDataAction, channelReportListAction} from "../../../redux/actions/index";
import {sync} from "../../../functions/sync";
import {AlertBox, FailedBoxAlert} from "../../../functions/notifications";
import {dispatch} from "../../../functions/dispatch";
import {ifInvalidToken} from "../../../functions/helpers";
import {navigate} from "../../../functions/navigate";
import {shouldUpdateDefinition} from "../../../redux/helpers";

export default class EditChannelButton extends Component {
	editElementBtn;

	edit(event) {
		$(event.target).parent().addClass("disabled");
		const {id} = this.props;
		sync(function*() {
			const {error, data, response} = yield (new swagger.ChannelApi())
				.channelIdGet(id, select('user.token', 'no token'));
			if (response.statusCode == '200') {
				$('#editChannelModal').modal();
				$(event.target).parent().removeClass("disabled");
				dispatch(channelDataAction(data));
			} else if (response.statusCode == '400') {
				$(event.target).parent().removeClass("disabled");
				FailedBoxAlert(response)
			}
			ifInvalidToken(response);
		});
	}

	detailChannel(e) {
		e = e.persist() || e;
		$(e.target).parent().addClass("disabled");
		const {id} = this.props;
		sync(function*() {
			const {error, data, response} = yield (new swagger.ChannelApi())
				.channelSpecificIdGet(id, select('user.token', 'no token'), {
					...select('queries.channelReport', {}),
					def: shouldUpdateDefinition('channelReportList')
				});
			if (response.statusCode == '200') {
				$(e.target).parent().removeClass("disabled");
				dispatch(channelReportListAction(data));

				navigate('/v1/publisher/channel/:channel_id:/report', {
					channel_id: id
				});
			} else if (response.statusCode == '400') {
				AlertBox("error", "اختلالی به وجود امده است لطفا دوباره تلاش کنید")
				$(event.target).parent().removeClass("disabled");
			}
		});
	}

	render() {
		return <div className="btn-group ">
			<button className="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">عملیات
				ها
				<i className="fa fa-angle-down"/>
			</button>
			<ul className="dropdown-menu keep_open">
				<li>
					<a href="javascript:;" key="edit" ref={(EditElement) => this.editElementBtn = EditElement}
					   className="edit-item mt-ladda-btn ladda-button" data-style="zoom-in"
					   onClick={(event) => this.edit(event)}> ویرایش کانال </a>
				</li>
				<li>
					<a href="javascript:;"
					   className="mt-ladda-btn ladda-button" data-style="zoom-in"
					   onClick={this.detailChannel.bind(this)}> مشاهده ریز آمار </a>
				</li>
			</ul>
		</div>
	}
}