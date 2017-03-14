import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import EditChannelModalCTR from "./EditChannelModalCTR";
import AddChannelModalCTR from "./AddChannelModalCTR";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";
import {securify} from "../../../functions/securify";

export default class ChannelListPTR extends Component {

    checkProfile() {
        if ((select('user.user_id') && (select('user.personal') || select('user.corporation')) == null) == true) {
            swal({
                    title: "لطفا قبل از افزودن کمپین، اطلاعات حساب کاربری خود را تکمیل نمایید",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#337ab7",
                    confirmButtonText: "باز کردن صفحه حساب کاربری",
                    cancelButtonText: "انصراف!",
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false,
                    closeOnCancel: true,
                    html: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        navigate('/v1/profile');
                    } else {
                        navigate('/v1/publisher/channel');
                    }
                });

        } else {
            $("#addChannelModal").modal();
        }
    }

    componentDidMount() {
        let _this = this;
        document.title = "مدیریت کانال ها";
        $(document).on("click", "#showAddChannelModalForm", function () {
            _this.checkProfile();
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
                        {securify(
                            () => <div className="actions">
                                <div className="btn-group btn-group-devided" data-toggle="buttons">
                                    <button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
                                            id="showAddChannelModalForm">افزودن کانال جدید
                                    </button>
                                </div>
                            </div>,
                            ({user}, {canSeeCreateChannel}, run) => run(canSeeCreateChannel())
                        )}

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