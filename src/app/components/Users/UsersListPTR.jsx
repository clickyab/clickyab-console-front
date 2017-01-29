import React, {Component} from 'react';
import DataTable from '../common/DataTable/DataTable';

export default class UsersListPTR extends Component {
    componentDidMount() {
        document.title = "مدیریت کاربران";
    }
    render() {
        return (
            <div className='page-content'>

                <h1 className="page-title"> مدیریت کاربران
                </h1>

                <div className='portlet light datatable-parent bordered'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'> لیست کاربران </span>
                        </div>
                        <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons">
                                    <button  className="btn btn-transparent blue btn-outline btn-circle btn-sm" id="showAddChannelModalForm" >افزودن کاربر جدید
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div className='portlet-body'>

                        <DataTable {...this.props} list="user"/>
                    </div>
                </div>
            </div>
        )
    }
}

UsersListPTR.propTypes = {
    items: React.PropTypes.array
};
