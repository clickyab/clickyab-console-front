import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class RolesListPTR extends Component {
    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'> مدیریت رول ها</h1>
                    </div>
                    <div className='top-action-header'>
                        <button className="btn btn-lg blue pull-left" id="showAddChannelModalForm">
                            <i className="fa fa-plus"/> ساخت رول جدید
                        </button>
                    </div>
                </div>
                <div className='portlet light datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>لیست چنل ها </span>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <DataTable {...this.props} list="role"/>
                    </div>
                </div>
            </div>
        )
    }
}