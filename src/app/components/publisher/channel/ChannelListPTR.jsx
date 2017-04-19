import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import EditChannelModalCTR from "./EditChannelModalCTR";
import AddChannelModalCTR from "./AddChannelModalCTR";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";
import {securify} from "../../../functions/securify";
import {sync} from "../../../functions/sync";
import swagger from "../../../swagger/index";
import {AlertBox} from "../../../functions/notifications";
let Ladda = require('ladda/js/ladda');
let swal = require('sweetalert');

export default class ChannelListPTR extends Component {
    checkPolicy() {
        if ((select('user.user_id') && (select('user.personal') || select('user.corporation')) == null) == true) {
            this.checkFillProfile()
        } else if (select('telegramList.items') == null || select('telegramList.items').length == 0 || select('telegramList').length == 0) {
            this.pingCheckResolve();
        } else {
            $("#addChannelModal").modal();
        }
    }

    checkFillProfile() {
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
    }

    //TODO: Crazy request, fix it later!
    pingCheckResolve() {
        let _this = this;
        sync(function *() {
            let {data, response} = yield (new swagger.UserApi())
                .userPingGet(select('user.token', 'no token'))

            if (response.statusCode == '200') {
                if (data.resolve == 'yes') {
                    $("#addChannelModal").modal();
                } else {
                    _this.checkHaveTelegramUser();
                }
            } else if (response.statusCode == '400') {
                AlertBox("error", "اختلالی در سیستم به وجود آمده است لطفا دوباره تلاش کنید");
            }
        })
    }

    checkHaveTelegramUser() {
        swal({
                title: "",
                text: "قبل از افزودن کانال جدید، لطفا حساب تلگرامی خود را تایید نمایید.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#337ab7",
                confirmButtonText: "فعال‌سازی",
                cancelButtonText: "انصراف!",
                closeOnConfirm: false,
                showLoaderOnConfirm: false,
                closeOnCancel: true,
                html: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    sync(function *() {
                        let {data, response} = yield (new swagger.TelegramApi())
                            .telegramPost(select("user.token", "no token"));

                        if (response.statusCode == '200') {
                            let keyCode = data.key;
                            swal({
                                    title: "<span class='select-telegram-code' style='direction:ltr;display: block' onclick='select_all(this)'>/verify-" + keyCode + "</span>",
                                    text: "هم اکنون کد بالا را  copy کرده و با زدن گزینه باز کردن تلگرام و فشردن دکمه start، کد را در بات ما paste نمایید و پس از فعال شدن حساب تلگرام خود، اقدام به ثبت کانال نمایید.",
                                    type: "success",
                                    showCancelButton: true,
                                    confirmButtonColor: "#337ab7",
                                    confirmButtonText: "باز کردن تلگرام",
                                    cancelButtonText: "بستن",
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: false,
                                    closeOnCancel: true,
                                    html: true
                                },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        window.open('http://t.me/rubikaddemobot', '_blank');
                                    }
                                });

                        } else if (response.statusCode == '400') {
                            AlertBox("error", "اختلالی در سیستم به وجود آمده است لطفا دوباره تلاش کنید");
                        }
                    });
                }
            }
        )
    }

    componentDidMount() {
        let _this = this;
        document.title = "مدیریت کانال ها";
        $(document).on("click", "#showAddChannelModalForm", function () {
            _this.checkPolicy();
        });

        window.select_all = function (el) {
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);

                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.select();
            }
        }
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
