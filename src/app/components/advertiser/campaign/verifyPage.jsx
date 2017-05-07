import React from "react";
import {dispatch} from "./../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";
import {NotifyBox} from "../../../functions/notifications";
import {navigate} from "../../../functions/navigate";
import {sync} from "../../../functions/sync";
import * as swagger from "./../../../swagger/index";
import {getToken} from "../../../redux/helpers";
let swal = require('sweetalert');

function activeStatus() {
    sync(function *() {
        yield (new swagger.AdApi())
            .campaignListActiveStatusIdPut(select('createCampaignData.id'), getToken(), {
                payloadData: {
                    "active_status": 'yes'
                }
            });
    })
}

export default function verifyPage({location}) {
    $('.preloader-page').hide();

    dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {
        pay_id: this.props.location.query.payment,
        payment_status: this.props.location.query.success,
    })));

    if (location.query.success === 'yes' && typeof location.query.payment !== 'undefined') {
        console.log("call active yes");
        this.activeStatus();
        swal({
            title: "پرداخت شما با موفقیت انجام شد",
            text: "<span>با تشکر از پرداخت شما</span><br/>این صفحه بعد از 5 ثانیه به صورت خودکار بسته می‌شود",
            type: "success",
            timer: 5000,
            showConfirmButton: true,
            confirmButtonText: "تایید",
            html: true,
            animation: "slide-from-top",
        });
        NotifyBox(
            'success',
            'پرداخت شما با موفقیت انجام شد.'
        );
        dispatch(createCampaign({}));
        navigate('/v1/advertiser/campaign');
    } else {
        swal({
            title: "پرداخت شما با دچار مشکل شده است",
            text: "<span>متاسفانه پرداخت شما با مشکل روبه‌رو شد. لطفا دوباره تلاش کنید</span><br/>این صفحه بعد از 5 ثانیه به صورت خودکار بسته می‌شود",
            type: "warning",
            timer: 5000,
            showConfirmButton: true,
            confirmButtonText: "تایید",
            confirmButtonColor: "#d31313",
            html: true,
            animation: "slide-from-top",
        });
        NotifyBox(
            'error',
            'متاسفانه پرداخت شما با مشکل روبه‌رو شد. لطفا دوباره تلاش کنید.'
        );
        navigate('/v1/advertiser/campaign/create/:campaign_id:/step/preview', {
            campaign_id: select('createCampaignData.id')
        });
    }

    dispatch(updateLocalStorageAction());

    return (<div/>)
}