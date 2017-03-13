import React, {Component} from "react";
import {dispatch} from "./../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";
import {NotifyBox} from "../../../functions/notifications";
import {navigate} from "../../../functions/navigate";
import {sync} from "../../../functions/sync";
import * as swagger from './../../../swagger/index';
import {getToken} from "../../../redux/helpers";

export default class verifyPage extends Component {

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

    componentDidMount() {
        $('.preloader-page').hide();

        dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {
            pay_id: this.props.location.query.payment,
            payment_status: this.props.location.query.success,
        })));

        if (this.props.location.query.success == 'yes' && typeof this.props.location.query.payment != 'undefined') {
            this.activeStatus();
            NotifyBox(
                'success',
                'پرداخت شما با موفقیت انجام شد.'
            );
            navigate('/v1/advertiser/campaign');
        } else {
            NotifyBox(
                'error',
                'متاسفانه پرداخت شما با مشکل روبه‌رو شد. لطفا دوباره تلاش کنید.'
            );
            navigate('/v1/advertiser/campaign/create/:campaign_id:/step/preview', {
                campaign_id: select('createCampaignData.id')
            });
        }

        dispatch(updateLocalStorageAction());
    }

    render() {
        return (<div/>)
    }
}