import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class TelegramListPTR extends Component {
    render() {
        return(
            <div className='page-content'>
                <div className='portlet light datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>لیست تلگرام </span>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <DataTable {...this.props} list="category"/>
                    </div>
                </div>
            </div>
        )
    }
}