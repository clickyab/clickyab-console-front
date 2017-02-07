import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import EditChannelModalCTR from "./EditChannelModalCTR";
import AddChannelModalCTR from "./AddChannelModalCTR";

export default class ChannelListPTR extends Component {
    componentDidMount() {
        document.title = "مدیریت کانال ها";
        $(document).on("click", "#showAddChannelModalForm", function () {
            $("#addChannelModal").modal();
        })
    }

    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'> مدیریت کانال ها</h1>
                    </div>
                </div>
                <div className='portlet light bordered datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'> لیست کانال ها </span>
                        </div>
                        <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons">
                                <button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
                                        id="showAddChannelModalForm">افزودن کانال جدید
                                </button>
                            </div>
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