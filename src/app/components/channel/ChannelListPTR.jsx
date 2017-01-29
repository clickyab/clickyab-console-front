import React, {Component} from 'react';
import {ConsoleTable} from '../common/ConsoleTable/ConsoleTable';
import EditChannelModalCTR from './EditChannelModalCTR'
import AddChannelModalCTR from './AddChannelModalCTR'

export default class ChannelListPTR extends Component {
    componentDidMount() {
        $(document).on("click", "#showAddChannelModalForm", function () {
            $("#addChannelModal").modal();
        })
    }

    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'> مدیریت چنل ها</h1>
                    </div>
                    <div className='top-action-header'>
                        <button className="btn btn-lg blue pull-left" id="showAddChannelModalForm">
                            <i className="fa fa-plus"/> ساخت چنل جدید
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
                        <ConsoleTable {...this.props} list="channel"/>
                    </div>
                </div>
                <AddChannelModalCTR/>
                <EditChannelModalCTR form="EditChannelModalPTR"/>
            </div>
        )
    }
}