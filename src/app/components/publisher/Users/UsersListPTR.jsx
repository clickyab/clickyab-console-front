import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import EditUserModalCTR from './EditUserModalCTR';

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
                    </div>
                    <div className='portlet-body'>
                        <ConsoleTable {...this.props} list="user"/>
                        <EditUserModalCTR form="EditUserModalPTR"/>
                    </div>
                </div>
            </div>
        )
    }
}

UsersListPTR.propTypes = {
    items: React.PropTypes.array
};
