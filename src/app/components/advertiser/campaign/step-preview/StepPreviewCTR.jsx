import React, {Component} from "react";
import StepPreviewPTR from "./StepPreviewPTR";
import {connect} from "react-redux";
import moment from "moment-jalali";
import swagger from "../../../../swagger/index";
import {sync} from "../../../../functions/sync";
import {select} from "../../../../functions/select";
import {AlertBox} from "../../../../functions/notifications";
import {campaignPaymentData} from "../../../../redux/actions/index";
import {dispatch} from "../../../../functions/dispatch";
import {getToken} from "../../../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect(({createCampaignData}) => ({createCampaignData}))
export default class StepPreviewCTR extends Component {
    loadingProgressSend;

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }

    activeStatus() {
        sync(function *() {
            yield (new swagger.AdApi())
                .campaignListActiveStatusIdPut(select('createCampaignData.id'), getToken(), {
                    payloadData: {
                        "active_status": 'yes'
                    }
                });
        })
    }

    requestAfterPayment() {
        sync(function *() {
            let {data, response} = yield (new swagger.BillingApi())
                .billingPaymentIdGet(select('createCampaignData.pay_id'), getToken());

            if (response.statusCode == '200') {
                dispatch(campaignPaymentData(data));
            } else if (response.statusCode == '400') {
                AlertBox("error", "در مرحله پرداخت اختلالی به وجود آمده است.");
            }
        })
    }

    requestToBank() {
        sync(function*() {
            this.loadingProgressSend = Ladda.create(document.querySelector('button.pay-button'));
            this.loadingProgressSend.start();
            let {data, response} = yield (new swagger.AdApi())
                .campaignPayAdIdGet(select('createCampaignData.id'), getToken());

            if (response.statusCode == '200') {
                window.location = data;
            } else if (response.statusCode == '400') {
                AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید");
                this.loadingProgressSend.stop();
            }
        }.bind(this));
    }

    componentDidMount() {
        if (select('createCampaignData.pay_id')) {
            this.requestAfterPayment()
        }
    }

    render() {
        return (<StepPreviewPTR activeStatus={this.activeStatus} requestAfterPayment={this.requestAfterPayment}
                                requestToBank={this.requestToBank.bind(this)} created_at={this.created_at}
                                data={this.props.createCampaignData}/>)
    }
}