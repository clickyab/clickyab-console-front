import React, {Component} from "react";
import {dispatch} from "./../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";

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

        //TODO: What the f**k??
        // navigate('advertiser/campaign/create/:campaign_id:/step/preview', {
        //     campaign_id: select('createCampaignData.id')
        // });
        //TODO: :|
        window.location = 'advertiser/campaign/create/' + select('createCampaignData.id') + '/step/preview';

        return (<div></div>)
    }
}