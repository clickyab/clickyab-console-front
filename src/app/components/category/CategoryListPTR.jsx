import React, {Component} from 'react';
import {ConsoleTable} from '../common/ConsoleTable/ConsoleTable';
import EditCategoryModalCTR from './EditCategoryModalCTR';
import AddCategoryModalCTR from './AddCategoryModalCTR';

export default class CategoryListPTR extends Component {
	componentDidMount() {
        document.title = "مدیریت دسته بندی ها";
		$(document).on("click","#showAddCategoryModalForm" , function () {
			$("#addCategoryModal").modal();
		})
	}
	render() {
		return (
			<div className='page-content'>

				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'>  مدیریت دسته ها</h1>
					</div>
				</div>
				<div className='portlet light bordered datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست دسته‌ها </span>
						</div>
						<div className="actions">
							<div className="btn-group btn-group-devided" data-toggle="buttons">
								<button  className="btn btn-transparent blue btn-outline btn-circle btn-sm" id="showAddCategoryModalForm" >افزودن دسته بندی جدید
								</button>
							</div>
						</div>
					</div>
					<div className='portlet-body'>
						<ConsoleTable {...this.props} list="category"/>
					</div>
				</div>
				<AddCategoryModalCTR />
				<EditCategoryModalCTR form="EditCategoryModalPTR"/>
			</div>
		)
	}
}