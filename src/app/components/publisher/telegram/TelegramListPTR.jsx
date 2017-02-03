import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";

export default class TelegramListPTR extends Component {
	render() {
		return (
			<div className='page-content'>
				<div className='portlet light datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست تلگرام </span>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="category"/>
					</div>
				</div>
			</div>
		)
	}
}