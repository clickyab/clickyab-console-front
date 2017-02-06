import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import EditRoleModalCTR from "./EditRoleModalCTR";
import AddRoleModalCTR from "./AddRoleModalCTR";

export default class RolesListPTR extends Component {
	componentDidMount() {
		$(document).on("click", "#showAddRoleModalForm", function () {
			$("#addRoleModal").modal();
		})
	}

	render() {
		return (
			<div className='page-content'>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'> مدیریت رول ها</h1>
					</div>
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست چنل ها </span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
										id="showAddRoleModalForm">ساخت رول جدید
								</button>
							</div>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="role"/>
					</div>
				</div>
				<AddRoleModalCTR permissions={this.props.permissions}/>
				<EditRoleModalCTR form="EditRoleModalPTR"/>
			</div>
		)
	}
}