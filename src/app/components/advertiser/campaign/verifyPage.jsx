import React, {Component} from "react";
import {dispatch} from "./../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";
import {NotifyBox} from "../../../functions/notifications";
import {navigate} from "../../../functions/navigate";

export default class verifyPage extends Component {

    componentDidMount() {
        $('.preloader-page').hide();
    }

    render() {
        dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {
            pay_id: this.props.location.query.payment,
            payment_status: this.props.location.query.success,
        })));
        dispatch(updateLocalStorageAction());
        NotifyBox(
            'success',
            'پرداخت شما با موفقیت انجام شد.'
        );

        navigate('/v1/advertiser/campaign');

        return (<div/>)
    }
}