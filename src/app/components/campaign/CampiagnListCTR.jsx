import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from './CampaignListPTR';

@connect(({campaignList}) => ({campaignList}))
export default class CampaignListCTR extends Component {
    render() {
        const {items, definitions} = this.props.campaignList;

        return (<CampaignListPTR items={items} definitions={definitions}/>);
    }
}