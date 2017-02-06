import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import AddTelegramCodeModalCTR from "./AddTelegramCodeModalCTR";

export default class TelegramListPTR extends Component {
	componentDidMount(){
        document.title = "مدیریت کاربران تلگرام";
        $(document).on("click", "#showGetTelegramCodeModalButton", function () {
            $("#showGetTelegramCodeModal").modal();
        })
	}
	render() {
		return (
			<div className='page-content'>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'>لیست کاربران تلگرام ثبت شده در سیستم</h1>
					</div>
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست تلگرام </span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
										id="showGetTelegramCodeModalButton">درخواست کد تلگرام
								</button>
							</div>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="category"/>
					</div>
				</div>
				<AddTelegramCodeModalCTR/>
			</div>
		)
	}
}