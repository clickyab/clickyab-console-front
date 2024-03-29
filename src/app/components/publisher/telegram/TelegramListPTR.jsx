import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import {AlertBox} from "../../../functions/notifications";
import {select} from "../../../functions/select";
import {translate} from "../../../functions/translate";
import {sync} from "../../../functions/sync";
import swagger from "../../../swagger/index";
import {telegramBot} from "../../../functions/telegramBot";
let Ladda = require('ladda/js/ladda');
let swal = require('sweetalert');
let loadingProgress;

export default class TelegramListPTR extends Component {
    componentDidMount() {
        document.title = "مدیریت کاربران تلگرام";

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

    GetTelegramCode() {
        sync(function*() {
            loadingProgress = Ladda.create(document.querySelector('button#showGetTelegramCodeButton'));
            loadingProgress.start();
            let {data, response} = yield (new swagger.TelegramApi())
                .telegramPost(select("user.token", "no token"));

            if (response.statusCode == 200) {
                let keyCode = data.key;
                swal({
                        title: "<span class='select-telegram-code' style='direction:ltr;display: block' onclick='select_all(this)'>/verify-" + keyCode + "</span>",
                        text: "هم اکنون کد بالا را  copy کرده و با زدن گزینه باز کردن تلگرام و فشردن دکمه start، کد را در بات ما paste نمایید",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#337ab7",
                        confirmButtonText: "باز کردن تلگرام",
                        cancelButtonText: "انصراف!",
                        closeOnConfirm: false,
                        showLoaderOnConfirm: false,
                        closeOnCancel: true,
                        html: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            window.open(telegramBot(), '_blank');
                        }
                    });

                loadingProgress.stop();
            } else if (response.statusCode == '400') {
                AlertBox("error", "اختلالی در سیستم به وجود آمده است لطفا دوباره تلاش کنید")
            }
        });
    }

    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'>{translate('Telegram Users')}</h1>
                    </div>
                </div>
                <div className="m-heading-1 border-green m-bordered">
                    <h5>{translate("After adding your users, copy and paste the telegram code in Rubikad Bot")}</h5>
                </div>
                <div className='portlet light bordered datatable-parent'>
                    <div className='portlet-title'>
                        <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons"
                                 onClick={this.GetTelegramCode}>
                                <button className="btn btn-transparent blue btn-outline btn-circle btn-sm "
                                        id="showGetTelegramCodeButton">{translate("Telegram code request")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <ConsoleTable {...this.props} list="telegram" action={false}/>
                    </div>
                </div>
            </div>
        )
    }
}