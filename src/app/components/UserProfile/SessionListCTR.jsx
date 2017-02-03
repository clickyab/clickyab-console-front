import React, {Component} from "react";
import SessionListPTR from "./SessionListPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {getToken} from "../../redux/helpers";
import moment from "moment-jalali";
import {AlertBox} from "../../functions/notifications";
import {ifInvalidToken} from "../../functions/helpers";
import $ from "jquery";
let swal = require('sweetalert');

@connect()
export default class SessionListCTR extends Component {


	componentDidMount() {
		function DisplaySessionList(data) {
			var $resultDisplay = $('.session-list');
			if ($resultDisplay.find('.session-item').length > 0) {
				$('.session-item').remove();
			}
			$.each(data, function (key, sessionItem) {
				$.each(sessionItem.sessions, function () {
					// let parser = new UAParser();
					// let user_agent = this.user_agent;
					// parser.setUA(user_agent);
					// let result_user_agent = parser.getResult();
					// let final_user_agent = result_user_agent.browser + '-' + result.os;

					$resultDisplay.append(
						'<div class="session-item left">' +
						'<div class="session-item-body"> ' +
						'<div class="session-item-info">' +
						'<span class="session-user-agent">' + this.user_agent + '</span>' +
						'<span class="created_at">' + moment(this.created_at).format('dddd، jD jMMMM jYYYY') + '</span>' +
						'</div>' +
						'<div class="session-ip">' + this.ip + '</div>' +
						'<div class="session-details">' +
						'<div class="session-item-actions">' +
						'<div class="btn-group">' +
						(this.current != true ? '<button type="button" class="btn btn-outline red btn-sm" id="delete-session" data-key=' + this.key + '>حذف سشن</button>' : '') +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>');
				})
			});
		}


		function sessionGetCallback({error, data, response}) {
			if (response.statusCode == '200') {
				DisplaySessionList(response);

			} else if (response.statusCode == '400') {

			}
		}

		function getListSessions() {
			(new swagger.UserApi())
				.userSessionsGet(getToken())
				.then(response => sessionGetCallback(response));
		}

		getListSessions();


		function sessionDeleteCallback({error, data, response}) {
			if (response.statusCode == '200') {
				DisplaySessionList(response);

			}
			else if (response.statusCode == '400') {

			}
			else if (response.statusCode == '401') {

			}
			ifInvalidToken(response);
		}


		$(document).on('click', '#delete-session', function () {
			let thisSession = $(this);
			let getDataKey = thisSession.attr("data-key");
			swal({
					title: "واقعا میخواهید سشن را پاک کنید؟",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#ed6b75",
					confirmButtonText: "بله سشن را پاک کن",
					cancelButtonText: "انصراف!",
					closeOnConfirm: true,
					showLoaderOnConfirm: true,
					closeOnCancel: true
				},
				function (isConfirm) {
					if (isConfirm) {
						(new swagger.UserApi())
							.userSessionTerminateIdGet(getDataKey, getToken())
							.then(response => sessionDeleteCallback(response));
						AlertBox("success", "سشن با موفقیت حذف گردید");
					} else {
					}
				});
		})

	}


	render() {
		return (<SessionListPTR />);
	}
}
