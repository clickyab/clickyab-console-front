import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from './CampaignListPTR';

@connect(({campaignList}) => ({campaignList}))
export default class CampaignListCTR extends Component {
    sort(flag) {
        console.log(flag)
    }

    filter(event) {
        console.log(event.target.value)
    }

    search(event) {
        console.log(event.target.value)
    }

    render() {
        const {items, definitions} = this.props.campaignList;

        return (<CampaignListPTR items={items} definitions={definitions}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
        />);
    }
}