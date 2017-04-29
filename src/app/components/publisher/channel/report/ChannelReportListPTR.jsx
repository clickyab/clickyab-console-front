import React, {Component} from "react";
import {ConsoleTable} from "../../../common/ConsoleTable/ConsoleTable";
import {navigate} from "../../../../functions/navigate";
let $ = require('jquery');

export default class ChannelReportListPTR extends Component {
	componentDidMount() {
		document.title = "مدیریت کانال ها";
		$(document).on("click", "#goBackToChannel", function () {
			navigate('/v1/publisher/channel')
		})
	}

	render() {
		return (
			<div className='page-content'>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'> مدیریت کانال ها</h1>
					</div>
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'> لیست کانال ها </span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
										id="goBackToChannel">بازگشت به لیست کانال‌ها
									<i className="fa fa-backward" aria-hidden="true" style={{paddingRight: '5px'}}/>
								</button>
							</div>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="channelReport"/>
					</div>
				</div>
			</div>
		)
	}
}