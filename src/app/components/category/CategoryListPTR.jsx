import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';
import EditCategoryModalCTR from './EditCategoryModalCTR';
import AddCategoryModalCTR from './AddCategoryModalCTR';

export default class CategoryListPTR extends Component {
	componentDidMount() {
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
					<div className='top-action-header'>
						<button  className="btn btn-lg blue pull-left" id="showAddCategoryModalForm">
							<i className="fa fa-plus"/>  ساخت دسته جدید </button>
					</div>
				</div>
				<div className='portlet light datatable-parent'>
					<div className='portlet-title'>
						<div className='caption'>
							<span className='caption-subject bold uppercase font-dark'>لیست دسته‌ها </span>
						</div>
					</div>
					<div className='portlet-body'>
						<DataTable {...this.props} list="category"/>
					</div>
				</div>
				<AddCategoryModalCTR />
				<EditCategoryModalCTR form="EditCategoryModalPTR"/>
			</div>
		)
	}
}