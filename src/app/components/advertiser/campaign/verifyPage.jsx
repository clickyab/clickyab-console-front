import React, {Component} from 'react';
import StepPreviewCTR from './step-preview/StepPreviewCTR';
import {dispatch} from './../../../functions/dispatch';
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";
import { browserHistory } from 'react-router'

export default class verifyPage extends Component {

    render() {
        dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {pay_status: this.props.location.query.success, pay_id: this.props.location.query.payment})));
        dispatch(updateLocalStorageAction());

        //TODO: What the f**k??
        // navigate('advertiser/campaign/create/:campaign_id:/step/preview', {
        //     campaign_id: select('createCampaignData.id')
        // });
        //TODO: :|
        window.location = 'advertiser/campaign/create/'+ select('createCampaignData.id') +'/step/preview';

        return(<div></div>)
    }
}