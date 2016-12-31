import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';
import EditChannelModalCTR from './EditChannelModalCTR'

export default class ChannelListPTR extends Component {
    render() {
        return (
            <div className='page-content'>

                <div className="page-bar">
                    <ul className="page-breadcrumb pull-right">
                        <li>
                            <a href="index.html">داشبورد</a>
                            <i className="fa fa-circle"/>
                        </li>
                        <li>
                            <span>نمایش دهنده</span>
                        </li>
                    </ul>
                    <div className="page-toolbar">

                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'>  مدیریت چنل ها</h1>
                    </div>
                    <div className='top-action-header'>
                        <a href="javascript:;" className="btn btn-lg blue pull-left">
                            <i className="fa fa-plus"/>  ساخت چنل جدید </a>
                    </div>
                </div>
                <div className='portlet light datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>لیست چنل ها </span>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <DataTable {...this.props}/>
                    </div>
                </div>
                <EditChannelModalCTR/>
            </div>
        )
    }
}